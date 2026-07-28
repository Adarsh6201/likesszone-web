import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import StoreLayout from './components/layout/StoreLayout';
import AdminLayout from './components/layout/AdminLayout';

// Guard
import AdminRoute from './components/guard/AdminRoute';

// Shop Pages
import Home from './pages/shop/Home';
import ProductList from './pages/shop/ProductList';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import About from './pages/shop/About';
import Policies from './pages/shop/Policies';
import MyOrders from './pages/shop/MyOrders';
import Settings from './pages/shop/Settings';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import DashboardOverview from './pages/admin/DashboardOverview';
import ProductManager from './pages/admin/ProductManager';
import OrderManager from './pages/admin/OrderManager';
import ProductTypeManager from './pages/admin/ProductTypeManager';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import SchemeManager from './pages/admin/SchemeManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Storefront Customer Routes */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route path="policies" element={<Policies />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Standalone Auth Routes without Header/Footer */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Management Panel (Protected Routes) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="product-types" element={<ProductTypeManager />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="schemes" element={<SchemeManager />} />
        </Route>

        {/* Fallback Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
