const BASE_URL = 'http://localhost:5000/api';

/**
 * Custom request wrapper for API calls
 * @param {string} endpoint - API path (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, headers, body)
 */
export const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  // Set default headers
  const headers = { ...options.headers };

  // Get token from localStorage if exists
  const token = localStorage.getItem('likesszon_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // If the body is NOT FormData, and headers do not contain Content-Type, default to JSON
  if (config.body && !(config.body instanceof FormData)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(config.body);
    }
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Throw response error message or fallback
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};
