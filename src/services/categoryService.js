import { request } from './api';

/**
 * Fetch all categories from the backend
 */
export const getCategoriesAPI = async () => {
  return request('/categories', {
    method: 'GET',
  });
};

/**
 * Create a new category with optional image file upload
 * @param {FormData} formData - Form data containing name, description, and image file
 */
export const createCategoryAPI = async (formData) => {
  return request('/categories', {
    method: 'POST',
    body: formData,
  });
};

/**
 * Delete a category by ID or slug
 * @param {string|number} idOrSlug - The ID or slug of the category to delete
 */
export const deleteCategoryAPI = async (idOrSlug) => {
  return request(`/categories/${idOrSlug}`, {
    method: 'DELETE',
  });
};

/**
 * Update an existing category details
 * @param {number} id - Category ID
 * @param {FormData} formData - Form data with updated name, description, or image
 */
export const updateCategoryAPI = async (id, formData) => {
  return request(`/categories/${id}`, {
    method: 'PUT',
    body: formData,
  });
};
