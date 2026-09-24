import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loginThunk,
  registerThunk,
  fetchProfileThunk,
  updateProfileThunk,
  logout,
  clearAuthError,
} from '../store/slices/authSlice';
import { setDarkMode } from '../store/slices/uiSlice';
import { clearOrders } from '../store/slices/orderSlice';
import { guestClearCart } from '../store/slices/cartSlice';
import { request } from '../services/api';

/**
 * Drop-in replacement for the old useAuth() context hook.
 * Exposes exactly the same shape so all existing consumers work unchanged.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((s) => s.auth);
  const isDarkMode = useAppSelector((s) => s.ui.isDarkMode);

  const login = useCallback(async (email, password) => {
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.rejected.match(result)) throw new Error(result.payload);
    return result.payload;
  }, [dispatch]);

  const register = useCallback(async (dataOrName, email, password, phone, profilePicture, role) => {
    const payload = typeof dataOrName === 'object' && dataOrName !== null
      ? dataOrName
      : { name: dataOrName, email, password, phone, profilePicture, role };
    const result = await dispatch(registerThunk(payload));
    if (registerThunk.rejected.match(result)) throw new Error(result.payload);
    return result.payload;
  }, [dispatch]);

  const logoutFn = useCallback(() => {
    dispatch(logout());
    dispatch(clearOrders());
    dispatch(guestClearCart());
  }, [dispatch]);

  const updateProfile = useCallback(async (formData) => {
    const result = await dispatch(updateProfileThunk(formData));
    if (updateProfileThunk.rejected.match(result)) throw new Error(result.payload);
    return result.payload;
  }, [dispatch]);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    return await request('/auth/change-password', {
      method: 'POST',
      body: { oldPassword, newPassword },
    });
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout: logoutFn,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isDarkMode,
    setIsDarkMode: (val) => dispatch(setDarkMode(val)),
    clearError: () => dispatch(clearAuthError()),
  };
};
