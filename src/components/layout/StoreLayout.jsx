import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { 
  ShoppingBag, Search, User, X, Plus, Minus, Trash2, 
  ArrowRight, Shield, LogOut, Sun, Moon, ShoppingCart, Menu, Settings
} from 'lucide-react';
import LogoImage from '../../assets/logo.png';

const StoreLayout = () => {
  const { user, logout, isAuthenticated, isAdmin, isDarkMode, setIsDarkMode } = useAuth();
  const { 
    cart, isCartOpen, closeCart, toggleCart, 
    updateQuantity, removeFromCart, cartCount, cartTotal 
  } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Close drawers and dropdowns on page route change
  useEffect(() => {
    closeCart();
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Mock navigation to products search
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* --- Sticky Storefront Header --- */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={LogoImage} 
                alt="Likesszon Logo" 
                className="h-10 w-10 object-contain rounded-full shadow-sm" 
              />
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                Likesszon
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</Link>
              <Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">My Orders</Link>
              <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          {/* Search bar */}
          <div className="hidden sm:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, brands, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-800/50 dark:focus:bg-slate-800"
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Dark Mode toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Cart Icon trigger */}
            <button 
              onClick={toggleCart} 
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 focus:outline-none"
                >
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full border border-indigo-500 object-cover" 
                  />
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}

              {/* Profile Dropdown Panel */}
              {isProfileOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900 focus:outline-none z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                    <span className="inline-block mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 capitalize">
                      {user.role}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    My Purchases
                  </Link>
                  <Link
                    to="/settings"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
            {/* Search (Mobile) */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-800"
              />
            </form>
            <div className="flex flex-col gap-2 font-medium">
              <Link to="/" className="block py-2 text-slate-700 dark:text-slate-300">Home</Link>
              <Link to="/shop" className="block py-2 text-slate-700 dark:text-slate-300">Shop</Link>
              <Link to="/orders" className="block py-2 text-slate-700 dark:text-slate-300">My Orders</Link>
              <Link to="/about" className="block py-2 text-slate-700 dark:text-slate-300">About Us</Link>
              {isAuthenticated && (
                <Link to="/settings" className="block py-2 text-slate-700 dark:text-slate-300">Settings</Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="block py-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* --- Main Storefront Canvas --- */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* --- Shopping Cart Drawer Slider --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Overlay background */}
          <div 
            onClick={closeCart}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Drawer container */}
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-xl flex flex-col h-full transform transition-transform duration-300 ease-out border-l border-slate-200 dark:border-slate-800">
              
              {/* Drawer Header */}
              <div className="px-4 py-6 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-indigo-600" />
                  Your Cart
                </h2>
                <button 
                  onClick={closeCart}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Body - Items List */}
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">Your cart is empty</p>
                    <p className="text-sm text-slate-500 mt-1 max-w-[200px]">Fill it with some of our luxury items.</p>
                    <button 
                      onClick={closeCart}
                      className="mt-6 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex py-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-20 w-20 rounded-lg object-cover border border-slate-200 dark:border-slate-800" 
                        />
                        <div className="ml-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-sm font-medium">
                              <h3 className="text-slate-900 dark:text-white truncate max-w-[150px]">{item.name}</h3>
                              <p className="ml-2 text-slate-900 dark:text-indigo-400 font-semibold">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-indigo-600"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-indigo-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer - Calculations & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800 py-6 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex justify-between text-base font-medium text-slate-900 dark:text-white">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center text-center text-sm text-slate-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={closeCart}
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                      >
                        Continue Shopping
                      </button>
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- Footer Design --- */}
      <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 dark:text-slate-400 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="text-xl font-bold tracking-tight text-white">Likesszon Shopping</span>
              <p className="text-sm">Your ultimate online shopping destination for premium computer accessories, electrical equipment, cameras, and unique lifestyle products.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Catalog</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop?category=computer-accessories-and-components" className="hover:text-white">Computer Accessories</Link></li>
                <li><Link to="/shop?category=electrical" className="hover:text-white">Electrical</Link></li>
                <li><Link to="/shop?category=camera" className="hover:text-white">Camera</Link></li>
                <li><Link to="/shop?category=more-items" className="hover:text-white">More Items</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support & Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/policies?tab=shipping" className="hover:text-white">Shipping Policy</Link></li>
                <li><Link to="/policies?tab=returns" className="hover:text-white">Return & Warranty</Link></li>
                <li><Link to="/policies?tab=terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link to="/policies?tab=privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Subscribe to our Newsletter</h3>
              <p className="text-sm">Sign up to get the latest sales, new releases and catalog updates.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                />
                <button 
                  type="button" 
                  className="rounded-lg bg-indigo-600 text-white font-semibold text-sm px-4 hover:bg-indigo-700 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs">
            <p>&copy; {new Date().getFullYear()} Likesszon Inc. All rights reserved.</p>
            <p className="mt-4 sm:mt-0">Curated with design-first aesthetics.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default StoreLayout;
