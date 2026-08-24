import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardStatsAPI } from '../../services/dashboardService';

export const fetchDashboardStatsThunk = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDashboardStatsAPI();
      if (res?.status === 'success') {
        return res.data;
      }
      return rejectWithValue('Failed to fetch dashboard statistics');
    } catch (err) {
      return rejectWithValue(err.message || 'Error loading dashboard metrics');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    summary: {
      totalRevenue: 0,
      totalOrders: 0,
      pendingOrders: 0,
      processingOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalProducts: 0,
      totalCategories: 0,
      totalUsers: 0,
      totalSchemes: 0,
      activeSchemes: 0,
    },
    recentOrders: [],
    categoryDistribution: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    resetDashboardState(state) {
      state.summary = {
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0,
        processingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalSchemes: 0,
        activeSchemes: 0,
      };
      state.recentOrders = [];
      state.categoryDistribution = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary || state.summary;
        state.recentOrders = action.payload.recentOrders || [];
        state.categoryDistribution = action.payload.categoryDistribution || [];
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
