const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl !== 'http://localhost:5000/api' && !envUrl.startsWith('/')) {
    return envUrl;
  }
  // When running Vite dev server or accessing from other LAN devices (e.g., 192.168.1.41:5173),
  // using '/api' routes requests through the Vite proxy back to the backend.
  return '/api';
};

export const BASE_URL = getBaseUrl();

/**
 * Resolves an image URL or upload path against the backend server URL
 * @param {string} imagePath
 * @returns {string}
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:') || imagePath.startsWith('blob:')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  if (BASE_URL.startsWith('http://') || BASE_URL.startsWith('https://')) {
    try {
      const backendOrigin = new URL(BASE_URL).origin;
      return `${backendOrigin}${cleanPath}`;
    } catch {
      return cleanPath;
    }
  }
  return cleanPath;
};


let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token, null));
  refreshSubscribers = [];
};

const onRefreshFailed = (err) => {
  refreshSubscribers.forEach((cb) => cb(null, err));
  refreshSubscribers = [];
};

/**
 * Custom request wrapper for API calls with automatic 401 token refresh
 * @param {string} endpoint - API path (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, headers, body)
 * @param {boolean} isRetry - Whether this is an internal retry after refresh
 */
export const request = async (endpoint, options = {}, isRetry = false) => {
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
      config.body = typeof config.body === 'string' ? config.body : JSON.stringify(config.body);
    }
  }

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized with silent token refresh
    if (
      response.status === 401 &&
      !isRetry &&
      !endpoint.includes('/auth/login') &&
      !endpoint.includes('/auth/signup') &&
      !endpoint.includes('/auth/refresh-token')
    ) {
      const refreshToken = localStorage.getItem('likesszon_refresh_token');

      if (refreshToken) {
        if (isRefreshing) {
          // Another request is already refreshing the token, wait for it
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken, refreshErr) => {
              if (refreshErr) {
                reject(refreshErr);
              } else {
                const retryConfig = { ...options };
                const retryHeaders = { ...retryConfig.headers, Authorization: `Bearer ${newToken}` };
                resolve(request(endpoint, { ...retryConfig, headers: retryHeaders }, true));
              }
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          const refreshData = await refreshRes.json();

          if (refreshRes.ok && refreshData?.data?.token) {
            const newToken = refreshData.data.token;
            localStorage.setItem('likesszon_token', newToken);
            isRefreshing = false;
            onRefreshed(newToken);

            // Retry original request with newly refreshed token
            const retryConfig = { ...options };
            const retryHeaders = { ...retryConfig.headers, Authorization: `Bearer ${newToken}` };
            return request(endpoint, { ...retryConfig, headers: retryHeaders }, true);
          } else {
            throw new Error(refreshData.message || 'Session expired');
          }
        } catch (refreshErr) {
          isRefreshing = false;
          onRefreshFailed(refreshErr);

          // Purge stale credentials
          localStorage.removeItem('likesszon_token');
          localStorage.removeItem('likesszon_refresh_token');
          localStorage.removeItem('likesszon_user');
          window.dispatchEvent(new CustomEvent('likesszon_session_expired'));

          throw new Error('Your session has expired. Please sign in again.');
        }
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};
