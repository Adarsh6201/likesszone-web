import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDashboardStatsThunk } from '../store/slices/dashboardSlice';

/**
 * Custom hook to interact with backend Dashboard metrics
 */
export const useDashboard = (autoFetch = true) => {
  const dispatch = useAppDispatch();
  const { summary, recentOrders, categoryDistribution, loading, error, lastUpdated } = useAppSelector(
    (state) => state.dashboard
  );

  const fetchDashboardStats = useCallback(() => {
    dispatch(fetchDashboardStatsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (autoFetch) {
      fetchDashboardStats();
    }
  }, [autoFetch, fetchDashboardStats]);

  return {
    summary,
    recentOrders,
    categoryDistribution,
    loading,
    error,
    lastUpdated,
    fetchDashboardStats,
  };
};
