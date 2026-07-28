import { request } from './api';

/**
 * Fetch all products from the backend
 */
export const getProductsAPI = async () => {
  return request('/products', {
    method: 'GET',
  });
};

/**
 * Fetch a single product by ID from the backend
 */
export const getProductByIdAPI = async (id) => {
  return request(`/products/${id}`, {
    method: 'GET',
  });
};

/**
 * Create a new product (Admin only)
 * @param {object} productData - Product payload
 */
export const createProductAPI = async (productData) => {
  return request('/products', {
    method: 'POST',
    body: productData,
  });
};

/**
 * Update an existing product (Admin only)
 * @param {string} id - Product ID
 * @param {object} productData - Updated product fields
 */
export const updateProductAPI = async (id, productData) => {
  return request(`/products/${id}`, {
    method: 'PUT',
    body: productData,
  });
};

/**
 * Delete a product (Admin only)
 * @param {string} id - Product ID
 */
export const deleteProductAPI = async (id) => {
  return request(`/products/${id}`, {
    method: 'DELETE',
  });
};
