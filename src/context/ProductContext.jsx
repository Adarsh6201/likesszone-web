import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories as initialCategories, orders as initialOrders } from '../data/mockData';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('likesszon_orders');
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('likesszon_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
  };

  const addCategory = (newCat) => {
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (slug) => {
    // Prevent deletion of base catalog types for safety
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrder = (orderId, updatedOrder) => {
    setOrders((prev) => prev.map((ord) => ord.id === orderId ? updatedOrder : ord));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        orders,
        addProduct,
        deleteProduct,
        updateProduct,
        addCategory,
        deleteCategory,
        addOrder,
        updateOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
