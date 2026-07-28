import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from '../../services/cartService';

// ─── Guest cart helpers ──────────────────────────────────────────────────────

const GUEST_KEY = 'likesszon_guest_cart';

const loadGuestCart = () => {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveGuestCart = (items) => {
  localStorage.setItem(GUEST_KEY, JSON.stringify(items));
};

const clearGuestCartStorage = () => {
  localStorage.removeItem(GUEST_KEY);
};

// ─── Normalise server cart item ──────────────────────────────────────────────

const normaliseServerCart = (data) => {
  if (!data || !data.items) return { items: [], total: 0, itemCount: 0 };
  const items = data.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.name,
    price: item.price,
    originalPrice: item.originalPrice,
    image: item.image,
    stock: item.stock,
    quantity: item.quantity,
    subtotal: item.subtotal,
  }));
  return { items, total: data.total ?? 0, itemCount: data.itemCount ?? 0 };
};

// ─── Thunks ─────────────────────────────────────────────────────────────────

export const fetchCartThunk = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCartAPI();
      if (res?.status === 'success') return normaliseServerCart(res.data);
      return rejectWithValue('Failed to fetch cart');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const addToCartThunk = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await addToCartAPI(productId, quantity);
      if (res?.status === 'success') return normaliseServerCart(res.data);
      return rejectWithValue('Failed to add to cart');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateCartItemThunk = createAsyncThunk(
  'cart/updateItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await updateCartItemAPI(cartItemId, quantity);
      if (res?.status === 'success') return normaliseServerCart(res.data);
      return rejectWithValue('Failed to update cart');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const removeCartItemThunk = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, { rejectWithValue }) => {
    try {
      const res = await removeCartItemAPI(cartItemId);
      if (res?.status === 'success') return normaliseServerCart(res.data);
      return rejectWithValue('Failed to remove item');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      await clearCartAPI();
      return { items: [], total: 0, itemCount: 0 };
    } catch (err) { return rejectWithValue(err.message); }
  }
);

// Merge guest cart into server cart after login
export const mergeGuestCartThunk = createAsyncThunk(
  'cart/mergeGuest',
  async (_, { dispatch }) => {
    const guestItems = loadGuestCart();
    if (guestItems.length > 0) {
      for (const item of guestItems) {
        try {
          await addToCartAPI(item.productId, item.quantity);
        } catch { /* skip failed items */ }
      }
      clearGuestCartStorage();
    }
    return dispatch(fetchCartThunk());
  }
);

// ─── Compute totals ──────────────────────────────────────────────────────────

const computeTotals = (items) => {
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = parseFloat(items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2));
  return { itemCount, total };
};

// ─── Slice ──────────────────────────────────────────────────────────────────

const guestCartItems = loadGuestCart();
const guestTotals = computeTotals(guestCartItems);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: guestCartItems,
    total: guestTotals.total,
    itemCount: guestTotals.itemCount,
    loading: false,
    error: null,
  },
  reducers: {
    // ── Guest cart actions ──────────────────────────────────────────────────
    guestAddItem(state, action) {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity += quantity;
        existing.subtotal = parseFloat((existing.price * existing.quantity).toFixed(2));
      } else {
        state.items.push({
          id: product.id,        // guest: use productId as stable id
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
          image: product.image,
          stock: product.stock ?? 999,
          quantity,
          subtotal: parseFloat((product.price * quantity).toFixed(2)),
        });
      }
      const t = computeTotals(state.items);
      state.total = t.total;
      state.itemCount = t.itemCount;
      saveGuestCart(state.items);
    },
    guestUpdateItem(state, action) {
      const { itemId, quantity } = action.payload;
      const idx = state.items.findIndex((i) => i.id === itemId);
      if (idx !== -1) {
        if (quantity <= 0) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].quantity = quantity;
          state.items[idx].subtotal = parseFloat((state.items[idx].price * quantity).toFixed(2));
        }
      }
      const t = computeTotals(state.items);
      state.total = t.total;
      state.itemCount = t.itemCount;
      saveGuestCart(state.items);
    },
    guestRemoveItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      const t = computeTotals(state.items);
      state.total = t.total;
      state.itemCount = t.itemCount;
      saveGuestCart(state.items);
    },
    guestClearCart(state) {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      clearGuestCartStorage();
    },
  },
  extraReducers: (builder) => {
    const setFromPayload = (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.itemCount = action.payload.itemCount;
      }
    };

    builder
      .addCase(fetchCartThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchCartThunk.fulfilled, setFromPayload)
      .addCase(fetchCartThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToCartThunk.pending, (state) => { state.loading = true; })
      .addCase(addToCartThunk.fulfilled, setFromPayload)
      .addCase(addToCartThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateCartItemThunk.pending, (state) => { state.loading = true; })
      .addCase(updateCartItemThunk.fulfilled, setFromPayload)
      .addCase(updateCartItemThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(removeCartItemThunk.pending, (state) => { state.loading = true; })
      .addCase(removeCartItemThunk.fulfilled, setFromPayload)
      .addCase(removeCartItemThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(clearCartThunk.pending, (state) => { state.loading = true; })
      .addCase(clearCartThunk.fulfilled, setFromPayload)
      .addCase(clearCartThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { guestAddItem, guestUpdateItem, guestRemoveItem, guestClearCart } = cartSlice.actions;
export default cartSlice.reducer;
