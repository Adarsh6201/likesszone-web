import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from '../../services/productService';
import {
  getCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from '../../services/categoryService';

// ─── Thunks ─────────────────────────────────────────────────────────────────

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProductsAPI();
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to fetch products');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchCategoriesThunk = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesAPI();
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to fetch categories');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const addProductThunk = createAsyncThunk(
  'products/add',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await createProductAPI(productData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to add product');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateProductThunk = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await updateProductAPI(id, productData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to update product');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteProductThunk = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductAPI(id);
      return id;
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const addCategoryThunk = createAsyncThunk(
  'products/addCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createCategoryAPI(formData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to add category');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  'products/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateCategoryAPI(id, formData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to update category');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  'products/deleteCategory',
  async (slug, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(slug);
      return slug;
    } catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────────────

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(fetchProductsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(addProductThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.products[idx] = action.payload;
      })
      .addCase(updateProductThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => { state.error = action.payload; })
      // Categories
      .addCase(fetchCategoriesThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...(action.payload || [])].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.categories.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.categories[idx] = action.payload;
        state.categories.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c.slug !== action.payload);
      });
  },
});

export default productSlice.reducer;
