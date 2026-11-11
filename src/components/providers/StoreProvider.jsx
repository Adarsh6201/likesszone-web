'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { fetchProfileThunk, logout } from '../../store/slices/authSlice';
import { fetchCartThunk, mergeGuestCartThunk } from '../../store/slices/cartSlice';
import { fetchProductsThunk, fetchCategoriesThunk } from '../../store/slices/productSlice';
import { fetchOrdersThunk } from '../../store/slices/orderSlice';

function AppInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('likesszon_token');

    // Always fetch public products and categories
    store.dispatch(fetchProductsThunk());
    store.dispatch(fetchCategoriesThunk());

    if (token) {
      store.dispatch(fetchProfileThunk()).then((result) => {
        if (fetchProfileThunk.fulfilled.match(result) && result.payload) {
          store.dispatch(mergeGuestCartThunk());
          store.dispatch(fetchOrdersThunk());
        }
      });
    }

    const handleSessionExpired = () => {
      store.dispatch(logout());
    };
    window.addEventListener('likesszon_session_expired', handleSessionExpired);
    return () => {
      window.removeEventListener('likesszon_session_expired', handleSessionExpired);
    };
  }, []);

  return null;
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <AppInit />
      {children}
    </Provider>
  );
}

