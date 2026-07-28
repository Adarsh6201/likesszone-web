import { request } from './api';

/**
 * Fetch all orders (Admin gets all, Customer gets their own)
 */
export const getOrdersAPI = async () => {
  return request('/orders', {
    method: 'GET',
  });
};

/**
 * Fetch a single order by ID (for tracking / invoice)
 * @param {string} id - Order ID (e.g. ORD-1)
 */
export const getOrderByIdAPI = async (id) => {
  return request(`/orders/${id}`, {
    method: 'GET',
  });
};

/**
 * Create/Place a new order (Public or Protected checkout)
 * @param {object} orderData - Order details, shipping details, and cart items
 */
export const createOrderAPI = async (orderData) => {
  return request('/orders', {
    method: 'POST',
    body: orderData,
  });
};

/**
 * Update an order's status or payment status (Admin only)
 * @param {string} id - Order ID
 * @param {object} statusData - Object containing status and/or paymentStatus
 */
export const updateOrderAPI = async (id, statusData) => {
  return request(`/orders/${id}`, {
    method: 'PUT',
    body: statusData,
  });
};
