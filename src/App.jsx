import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { logout } from './store/slices/authSlice';

// Layouts
import StoreLayout from './components/layout/StoreLayout';
import AdminLayout from './components/layout/AdminLayout';

// Guard
import AdminRoute from './components/guard/AdminRoute';

// Core Shop Pages (Eagerly loaded for lightning-fast initial paint)
import Home from './pages/shop/Home';
import ProductList from './pages/shop/ProductList';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';

// Lazy-loaded Shop & Policy Pages
const Checkout = lazy(() => import('./pages/shop/Checkout'));
const About = lazy(() => import('./pages/shop/About'));
const Policies = lazy(() => import('./pages/shop/Policies'));
const MyOrders = lazy(() => import('./pages/shop/MyOrders'));
const Settings = lazy(() => import('./pages/shop/Settings'));

// Lazy-loaded Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// Lazy-loaded Admin Pages (Code-split out of customer bundle)
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const ProductManager = lazy(() => import('./pages/admin/ProductManager'));
const OrderManager = lazy(() => import('./pages/admin/OrderManager'));
const ProductTypeManager = lazy(() => import('./pages/admin/ProductTypeManager'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));
const EditProduct = lazy(() => import('./pages/admin/EditProduct'));
const SchemeManager = lazy(() => import('./pages/admin/SchemeManager'));
const InvoiceManager = lazy(() => import('./pages/admin/InvoiceManager'));
const PaymentHistoryManager = lazy(() => import('./pages/admin/PaymentHistoryManager'));
const LedgerManager = lazy(() => import('./pages/admin/LedgerManager'));

// Elegant route loader
const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch(logout());
    };
    window.addEventListener('likesszon_session_expired', handleSessionExpired);
    return () => {
      window.removeEventListener('likesszon_session_expired', handleSessionExpired);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
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
            <Route path="categories" element={<Navigate to="/admin/product-types" replace />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="invoices" element={<InvoiceManager />} />
            <Route path="payment-history" element={<PaymentHistoryManager />} />
            <Route path="ledger" element={<LedgerManager />} />
            <Route path="schemes" element={<SchemeManager />} />
          </Route>

          {/* Fallback Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
