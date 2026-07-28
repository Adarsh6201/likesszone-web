import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from '../store/slices/productSlice';
import {
  addOrderThunk,
  updateOrderThunk,
} from '../store/slices/orderSlice';

/**
 * Drop-in replacement for the old useProducts() context hook.
 * Exposes exactly the same shape so all existing consumers work unchanged.
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((s) => s.products.products);
  const categories = useAppSelector((s) => s.products.categories);
  const orders = useAppSelector((s) => s.orders.orders);

  const fetchProducts = useCallback(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const fetchCategories = useCallback(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  // ── Products ──────────────────────────────────────────────────────────────

  const addProduct = useCallback(async (productData) => {
    const result = await dispatch(addProductThunk(productData));
    if (addProductThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to add product';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const updateProduct = useCallback(async (id, productData) => {
    const result = await dispatch(updateProductThunk({ id, productData }));
    if (updateProductThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to update product';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const deleteProduct = useCallback(async (id) => {
    const result = await dispatch(deleteProductThunk(id));
    if (deleteProductThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to delete product';
      alert(msg);
      throw new Error(msg);
    }
  }, [dispatch]);

  // ── Categories ────────────────────────────────────────────────────────────

  const addCategory = useCallback(async (categoryData) => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    if (categoryData.description) formData.append('description', categoryData.description);
    if (categoryData.imageFile) formData.append('image', categoryData.imageFile);

    const result = await dispatch(addCategoryThunk(formData));
    if (addCategoryThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to add category';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const updateCategory = useCallback(async (id, categoryData) => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    if (categoryData.description) formData.append('description', categoryData.description);
    if (categoryData.imageFile) formData.append('image', categoryData.imageFile);

    const result = await dispatch(updateCategoryThunk({ id, formData }));
    if (updateCategoryThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to update category';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const deleteCategory = useCallback(async (slug) => {
    const result = await dispatch(deleteCategoryThunk(slug));
    if (deleteCategoryThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to delete category';
      alert(msg);
      throw new Error(msg);
    }
  }, [dispatch]);

  // ── Orders ────────────────────────────────────────────────────────────────

  const addOrder = useCallback(async (orderData) => {
    const result = await dispatch(addOrderThunk(orderData));
    if (addOrderThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to place order';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  const updateOrder = useCallback(async (orderId, updatedOrder) => {
    const statusData = {
      status: updatedOrder.status,
      paymentStatus: updatedOrder.paymentStatus,
    };
    const result = await dispatch(updateOrderThunk({ orderId, statusData }));
    if (updateOrderThunk.rejected.match(result)) {
      const msg = result.payload || 'Failed to update order';
      alert(msg);
      throw new Error(msg);
    }
    return result.payload;
  }, [dispatch]);

  return {
    products,
    categories,
    orders,
    fetchProducts,
    fetchCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addOrder,
    updateOrder,
  };
};
