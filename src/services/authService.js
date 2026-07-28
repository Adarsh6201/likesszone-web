import { request } from './api';

/**
 * Perform login API request
 * @param {string} email 
 * @param {string} password 
 */
export const loginAPI = async (email, password) => {
  return request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
};

/**
 * Perform signup API request
 * @param {FormData} formData 
 */
export const signupAPI = async (formData) => {
  return request('/auth/signup', {
    method: 'POST',
    body: formData,
  });
};

/**
 * Get profile details of currently authenticated user
 */
export const getProfileAPI = async () => {
  return request('/auth/me', {
    method: 'GET',
  });
};

/**
 * Update authenticated user profile details
 * @param {FormData} formData
 */
export const updateProfileAPI = async (formData) => {
  return request('/auth/profile', {
    method: 'PUT',
    body: formData,
  });
};
