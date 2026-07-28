import { request } from './api';

/**
 * Fetch the current authenticated user's cart
 */
export const getCartAPI = async () => {
  return request('/cart', {
    method: 'GET',
  });
};

/**
 * Add a product to the cart (creates cart if it doesn't exist)
 * @param {string} productId - Product ID to add
 * @param {number} quantity - How many to add (default 1)
 */
export const addToCartAPI = async (productId, quantity = 1) => {
  return request('/cart', {
    method: 'POST',
    body: { productId, quantity },
  });
};

/**
 * Update the quantity of a specific cart item
 * @param {number} cartItemId - The CartItem row ID
 * @param {number} quantity - New quantity
 */
export const updateCartItemAPI = async (cartItemId, quantity) => {
  return request(`/cart/${cartItemId}`, {
    method: 'PUT',
    body: { quantity },
  });
};

/**
 * Remove a specific item from the cart
 * @param {number} cartItemId - The CartItem row ID
 */
export const removeCartItemAPI = async (cartItemId) => {
  return request(`/cart/${cartItemId}`, {
    method: 'DELETE',
  });
};

/**
 * Clear all items from the cart
 */
export const clearCartAPI = async () => {
  return request('/cart', {
    method: 'DELETE',
  });
};
