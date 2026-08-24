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
 * @param {FormData|object} data 
 */
export const signupAPI = async (data) => {
  let body = data;
  if (data && !(data instanceof FormData)) {
    body = new FormData();
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (val !== null && val !== undefined && val !== '') {
        if (key === 'profilePicture' && !(val instanceof File)) {
          if (typeof val === 'string' && val.startsWith('http')) {
            body.append(key, val);
          }
        } else {
          body.append(key, val);
        }
      }
    });
  }

  return request('/auth/signup', {
    method: 'POST',
    body,
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
 * @param {FormData|object} data
 */
export const updateProfileAPI = async (data) => {
  let body = data;
  if (data && !(data instanceof FormData)) {
    body = new FormData();
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (val !== null && val !== undefined) {
        if (key === 'profilePicture' && !(val instanceof File)) {
          if (typeof val === 'string' && val.startsWith('http')) {
            body.append(key, val);
          }
        } else {
          body.append(key, val);
        }
      }
    });
  }

  return request('/auth/profile', {
    method: 'PUT',
    body,
  });
};
