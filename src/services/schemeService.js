import { request } from './api';

/**
 * Fetch all schemes (Admin gets all, user gets active)
 */
export const getSchemesAPI = async () => {
  return request('/schemes', {
    method: 'GET',
  });
};

/**
 * Create a new scheme (Admin only)
 */
export const createSchemeAPI = async (schemeData) => {
  return request('/schemes', {
    method: 'POST',
    body: schemeData,
  });
};

/**
 * Update an existing scheme (Admin only)
 */
export const updateSchemeAPI = async (id, schemeData) => {
  return request(`/schemes/${id}`, {
    method: 'PUT',
    body: schemeData,
  });
};

/**
 * Delete a scheme (Admin only)
 */
export const deleteSchemeAPI = async (id) => {
  return request(`/schemes/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Apply a promotional scheme/coupon code against current cart
 */
export const applySchemeAPI = async (code, cartItems) => {
  return request('/schemes/apply', {
    method: 'POST',
    body: { code, cartItems },
  });
};
