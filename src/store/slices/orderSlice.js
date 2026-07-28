import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersAPI, createOrderAPI, updateOrderAPI } from '../../services/orderService';

// ─── Thunks ─────────────────────────────────────────────────────────────────

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersAPI();
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to fetch orders');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const addOrderThunk = createAsyncThunk(
  'orders/add',
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await createOrderAPI(orderData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to place order');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateOrderThunk = createAsyncThunk(
  'orders/update',
  async ({ orderId, statusData }, { rejectWithValue }) => {
    try {
      const res = await updateOrderAPI(orderId, statusData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to update order');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────────────

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders(state) {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addOrderThunk.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(addOrderThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(updateOrderThunk.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
