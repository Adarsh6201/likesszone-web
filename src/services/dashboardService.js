import { request } from './api';

/**
 * Fetch overview stats and metrics for admin dashboard
 */
export const getDashboardStatsAPI = async () => {
  return request('/dashboard', {
    method: 'GET',
  });
};
