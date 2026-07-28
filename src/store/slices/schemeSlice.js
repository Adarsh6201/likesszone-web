import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSchemesAPI,
  createSchemeAPI,
  updateSchemeAPI,
  deleteSchemeAPI,
  applySchemeAPI,
} from '../../services/schemeService';

// ─── Thunks ─────────────────────────────────────────────────────────────────

export const fetchSchemesThunk = createAsyncThunk(
  'schemes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSchemesAPI();
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to fetch schemes');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const addSchemeThunk = createAsyncThunk(
  'schemes/add',
  async (schemeData, { rejectWithValue }) => {
    try {
      const res = await createSchemeAPI(schemeData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to create scheme');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateSchemeThunk = createAsyncThunk(
  'schemes/update',
  async ({ id, schemeData }, { rejectWithValue }) => {
    try {
      const res = await updateSchemeAPI(id, schemeData);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to update scheme');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteSchemeThunk = createAsyncThunk(
  'schemes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteSchemeAPI(id);
      return id;
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const applySchemeThunk = createAsyncThunk(
  'schemes/apply',
  async ({ code, cartItems }, { rejectWithValue }) => {
    try {
      const res = await applySchemeAPI(code, cartItems);
      if (res?.status === 'success') return res.data;
      return rejectWithValue('Failed to apply offer code');
    } catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────────────

const schemeSlice = createSlice({
  name: 'schemes',
  initialState: {
    schemes: [],
    appliedScheme: null, // Holds { code, title, type, discountAmount, finalTotal }
    loading: false,
    applyLoading: false,
    error: null,
    applyError: null,
  },
  reducers: {
    clearAppliedScheme(state) {
      state.appliedScheme = null;
      state.applyError = null;
    },
    clearSchemeError(state) {
      state.error = null;
      state.applyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchemesThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchSchemesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.schemes = action.payload;
      })
      .addCase(fetchSchemesThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addSchemeThunk.fulfilled, (state, action) => {
        state.schemes.unshift(action.payload);
      })
      .addCase(addSchemeThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateSchemeThunk.fulfilled, (state, action) => {
        const idx = state.schemes.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.schemes[idx] = action.payload;
      })
      .addCase(updateSchemeThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(deleteSchemeThunk.fulfilled, (state, action) => {
        state.schemes = state.schemes.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSchemeThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(applySchemeThunk.pending, (state) => {
        state.applyLoading = true;
        state.applyError = null;
      })
      .addCase(applySchemeThunk.fulfilled, (state, action) => {
        state.applyLoading = false;
        state.appliedScheme = action.payload;
      })
      .addCase(applySchemeThunk.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyError = action.payload;
      });
  },
});

export const { clearAppliedScheme, clearSchemeError } = schemeSlice.actions;
export default schemeSlice.reducer;
