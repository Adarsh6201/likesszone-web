import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCartThunk,
  addToCartThunk,
  updateCartItemThunk,
  removeCartItemThunk,
  clearCartThunk,
  guestAddItem,
  guestUpdateItem,
  guestRemoveItem,
  guestClearCart,
} from '../store/slices/cartSlice';
import { openCart, closeCart, toggleCart } from '../store/slices/uiSlice';

/**
 * Drop-in replacement for the old useCart() context hook.
 * Routes to server API for logged-in users and localStorage for guests.
 */
export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items: cart, total: cartTotal, itemCount: cartCount, loading } = useAppSelector((s) => s.cart);
  const isCartOpen = useAppSelector((s) => s.ui.isCartOpen);
  const user = useAppSelector((s) => s.auth.user);

  const addToCart = useCallback(async (product, quantity = 1) => {
    if (user) {
      const result = await dispatch(addToCartThunk({ productId: product.id, quantity }));
      if (addToCartThunk.rejected.match(result)) {
        alert(result.payload || 'Failed to add item to cart');
      }
    } else {
      dispatch(guestAddItem({ product, quantity }));
    }
    dispatch(openCart());
  }, [dispatch, user]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    if (user) {
      const result = await dispatch(updateCartItemThunk({ cartItemId: itemId, quantity }));
      if (updateCartItemThunk.rejected.match(result)) {
        alert(result.payload || 'Failed to update cart');
      }
    } else {
      dispatch(guestUpdateItem({ itemId, quantity }));
    }
  }, [dispatch, user]);

  const removeFromCart = useCallback(async (itemId) => {
    if (user) {
      const result = await dispatch(removeCartItemThunk(itemId));
      if (removeCartItemThunk.rejected.match(result)) {
        alert(result.payload || 'Failed to remove item');
      }
    } else {
      dispatch(guestRemoveItem(itemId));
    }
  }, [dispatch, user]);

  const clearCart = useCallback(async () => {
    if (user) {
      dispatch(clearCartThunk());
    } else {
      dispatch(guestClearCart());
    }
  }, [dispatch, user]);

  const refreshCart = useCallback(() => {
    if (user) dispatch(fetchCartThunk());
  }, [dispatch, user]);

  return {
    cart,
    loading,
    isCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    toggleCart: () => dispatch(toggleCart()),
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
  };
};
