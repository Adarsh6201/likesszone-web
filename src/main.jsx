import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import store from './store/index.js';
import { fetchProfileThunk } from './store/slices/authSlice.js';
import { fetchCartThunk, mergeGuestCartThunk } from './store/slices/cartSlice.js';
import { fetchProductsThunk, fetchCategoriesThunk } from './store/slices/productSlice.js';
import { fetchOrdersThunk } from './store/slices/orderSlice.js';

/**
 * AppInit — fires all initial data fetches once on mount.
 * Lives inside <Provider> so it can dispatch thunks.
 */
function AppInit() {
  useEffect(() => {
    const token = localStorage.getItem('likesszon_token');

    // Always load products + categories (public data)
    store.dispatch(fetchProductsThunk());
    store.dispatch(fetchCategoriesThunk());

    if (token) {
      // Load user profile, then cart (merge guest items if any)
      store.dispatch(fetchProfileThunk()).then((result) => {
        if (fetchProfileThunk.fulfilled.match(result) && result.payload) {
          // User is authenticated — load their server cart (merging any guest items)
          store.dispatch(mergeGuestCartThunk());
          // Load their orders
          store.dispatch(fetchOrdersThunk());
        }
      });
    }
  }, []);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppInit />
      <App />
    </Provider>
  </StrictMode>,
);
