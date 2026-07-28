import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchSchemesThunk,
  addSchemeThunk,
  updateSchemeThunk,
  deleteSchemeThunk,
  applySchemeThunk,
  clearAppliedScheme,
  clearSchemeError,
} from '../store/slices/schemeSlice';

export const useSchemes = () => {
  const dispatch = useAppDispatch();
  const {
    schemes,
    appliedScheme,
    loading,
    applyLoading,
    error,
    applyError,
  } = useAppSelector((s) => s.schemes);

  const fetchSchemes = useCallback(() => {
    dispatch(fetchSchemesThunk());
  }, [dispatch]);

  const addScheme = useCallback(async (schemeData) => {
    const result = await dispatch(addSchemeThunk(schemeData));
    if (addSchemeThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to create scheme';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const updateScheme = useCallback(async (id, schemeData) => {
    const result = await dispatch(updateSchemeThunk({ id, schemeData }));
    if (updateSchemeThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to update scheme';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const deleteScheme = useCallback(async (id) => {
    const result = await dispatch(deleteSchemeThunk(id));
    if (deleteSchemeThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to delete scheme';
      alert(msg);
      throw new Error(msg);
    }
  }, [dispatch]);

  const applyScheme = useCallback(async (code, cartItems) => {
    const result = await dispatch(applySchemeThunk({ code, cartItems }));
    if (applySchemeThunk.rejected.match(result)) {
      throw new Error(result.payload || 'Failed to apply offer code');
    }
    return result.payload;
  }, [dispatch]);

  const removeAppliedScheme = useCallback(() => {
    dispatch(clearAppliedScheme());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearSchemeError());
  }, [dispatch]);

  return {
    schemes,
    appliedScheme,
    loading,
    applyLoading,
    error,
    applyError,
    fetchSchemes,
    addScheme,
    updateScheme,
    deleteScheme,
    applyScheme,
    removeAppliedScheme,
    clearError,
  };
};
