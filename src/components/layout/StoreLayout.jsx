'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { getImageUrl } from '../../services/api';
import { 
  ShoppingBag, Search, User, X, Plus, Minus, Trash2, 
  ArrowRight, Shield, LogOut, Sun, Moon, ShoppingCart, Menu, Settings,
  Phone, MapPin, ChevronDown, Check, Mail, ChevronUp
} from 'lucide-react';
import LogoImage from '../../assets/logo.png';
import AddAddressBottomModal from '../shop/AddAddressBottomModal';

const StoreLayout = ({ children }) => {
  const { user, logout, isAuthenticated, isAdmin, isDarkMode, setIsDarkMode } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { 
    cart, isCartOpen, closeCart, toggleCart, 
    updateQuantity, removeFromCart, cartCount, cartTotal 
  } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Amazon-style Location State
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ city: 'Hazaribagh', zip: '825301' });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const locationRef = useRef(null);

  const { fetchProducts, fetchCategories } = useProducts();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize location & saved addresses from localStorage or user record
  useEffect(() => {
    try {
      const savedLoc = localStorage.getItem('likesszon_delivery_location');
      if (savedLoc) {
        setCurrentLocation(JSON.parse(savedLoc));
      } else if (user?.city || user?.zipCode) {
        setCurrentLocation({
          city: user.city || 'Hazaribagh',
          zip: user.zipCode || '825301',
        });
      }

      const storedAddresses = localStorage.getItem('likesszon_saved_addresses');
      if (storedAddresses) {
        setSavedAddresses(JSON.parse(storedAddresses));
      } else {
        setSavedAddresses([
          {
            id: 'addr-1',
            name: user?.name || 'Customer',
            address: user?.address || 'New Area 1st Gali Okni near Joda Shiv Mandir',
            city: user?.city || 'Hazaribagh',
            zip: user?.zipCode || '825301',
            type: 'Home',
          },
        ]);
      }
    } catch (e) {
      console.error('Error reading location/address:', e);
    }
  }, [user]);

  // Click outside to close location dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAddress = (addr) => {
    const loc = { city: addr.city || 'Hazaribagh', zip: addr.zip || '825301' };
    setCurrentLocation(loc);
    try {
      localStorage.setItem('likesszon_delivery_location', JSON.stringify(loc));
    } catch (e) {}
    setIsLocationOpen(false);
  };

  const handleSaveNewAddress = (newAddr) => {
    const updated = [newAddr, ...savedAddresses.filter(a => a.id !== newAddr.id)];
    setSavedAddresses(updated);
    try {
      localStorage.setItem('likesszon_saved_addresses', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving addresses:', e);
    }
    const loc = { city: newAddr.city || 'Delivery Area', zip: newAddr.zip || '825301' };
    setCurrentLocation(loc);
    try {
      localStorage.setItem('likesszon_delivery_location', JSON.stringify(loc));
    } catch (e) {}
    setIsAddAddressModalOpen(false);
    setIsLocationOpen(false);
  };

  // Load products and categories globally for customer storefront
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Close drawers and dropdowns on page route change
  useEffect(() => {
    closeCart();
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
    setIsLocationOpen(false);
    setIsAddAddressModalOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Mock navigation to products search
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* --- Sticky Storefront Header (#bd1f35 Theme) --- */}
      <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#bd1f35] to-[#8a0025] border-b border-[#70001d] shadow-md">
        <div className="w-full flex h-16 items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-6 lg:px-8">
          
          {/* 1. Logo & Brand Name (Far Left) */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img 
              src={LogoImage?.src || LogoImage || '/logo.png'} 
              alt="Likesszon Logo" 
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-full bg-white p-0.5 shadow-sm shrink-0" 
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white select-none">
              Likesszon
            </span>
          </Link>

          {/* 1.5. Amazon-style Location / Address Selector (Between Brand & Search) */}
          <div className="relative shrink-0" ref={locationRef}>
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl hover:bg-white/10 text-left transition-colors text-white group cursor-pointer border border-transparent hover:border-white/20 select-none"
              title="Change Delivery Location"
            >
              <MapPin className="h-4 w-4 text-white/90 group-hover:text-white shrink-0 mt-0.5" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-white/75 font-normal truncate max-w-[110px]">
                  Deliver to {user?.name ? user.name.split(' ')[0] : 'Guest'}
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-0.5 truncate max-w-[130px]">
                  {currentLocation.city} {currentLocation.zip}
                  <ChevronDown className="h-3 w-3 text-white/80 shrink-0 ml-0.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                </span>
              </div>
            </button>

            {/* Location Selector Dropdown Panel */}
            {mounted && isLocationOpen && (
              <div className="absolute left-0 mt-2.5 w-80 sm:w-96 origin-top-left rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 focus:outline-none z-50 text-slate-800 dark:text-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#bd1f35]" /> Choose your location
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsLocationOpen(false)}
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 mb-3 leading-relaxed">
                  Select a delivery location to check product availability and delivery speeds.
                </p>

                {/* Section Header with Add Address action */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Saved Addresses {savedAddresses.length > 0 && `(${savedAddresses.length})`}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationOpen(false);
                      setIsAddAddressModalOpen(true);
                    }}
                    className="text-xs font-bold text-[#bd1f35] hover:text-[#8a0025] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Address
                  </button>
                </div>

                {/* Saved addresses list */}
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {savedAddresses && savedAddresses.length > 0 ? (
                    savedAddresses.map((addr) => {
                      const isSelected = currentLocation.zip === addr.zip;
                      return (
                        <div
                          key={addr.id || addr.zip}
                          onClick={() => handleSelectAddress(addr)}
                          className={`flex items-start justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#bd1f35] bg-[#bd1f35]/5 dark:bg-[#bd1f35]/15 text-slate-900 dark:text-white shadow-xs ring-1 ring-[#bd1f35]/30'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 flex-1 pr-2">
                            <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected 
                                ? 'border-[#bd1f35] bg-[#bd1f35] text-white' 
                                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                            }`}>
                              {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                <span>{addr.type || 'Home'}</span>
                                <span className="text-[10px] text-slate-400 font-normal">({addr.zip})</span>
                                {isSelected && (
                                  <span className="text-[9px] font-bold text-[#bd1f35] bg-[#bd1f35]/10 px-1.5 py-0.5 rounded-md">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                                {addr.address}, {addr.city}
                              </p>
                              {addr.phone && (
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  Phone: {addr.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-slate-400">
                      <MapPin className="h-8 w-8 mx-auto mb-1 text-slate-300 dark:text-slate-700" />
                      <p className="text-xs font-semibold">No saved addresses found</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Click Add New Address to add one</p>
                    </div>
                  )}
                </div>

                {/* Prominent Add Address Button */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationOpen(false);
                      setIsAddAddressModalOpen(true);
                    }}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-[#bd1f35] to-[#8a0025] hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add New Address
                  </button>
                </div>

                {/* Footer link */}
                <div className="mt-2.5 pt-2 text-center border-t border-slate-100 dark:border-slate-800">
                  {isAuthenticated ? (
                    <Link
                      to="/settings"
                      onClick={() => setIsLocationOpen(false)}
                      className="text-[11px] text-[#bd1f35] dark:text-[#f17081] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Manage saved addresses in Settings →
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsLocationOpen(false)}
                      className="text-[11px] text-[#bd1f35] dark:text-[#f17081] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Sign in to see your saved addresses →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. Search bar with Search Button (Directly after Location selector) */}
          <div className="hidden sm:flex flex-1 max-w-md lg:max-w-lg">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products, brands, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-none bg-white py-1.5 pl-10 pr-20 text-sm text-slate-900 placeholder:text-slate-400 shadow-inner outline-none focus:ring-2 focus:ring-white/80"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#bd1f35] hover:bg-[#8a0025] text-white rounded-full text-xs font-semibold flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* 3. Navigation Links (Home, Shop, My Orders, About Us, Admin Panel) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-white/90 shrink-0">
            <Link to="/" className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">Shop</Link>
            <Link to="/orders" className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">My Orders</Link>
            <Link to="/about" className="hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">About Us</Link>
            {mounted && isAdmin && (
              <Link to="/admin" className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full font-semibold text-xs transition-colors border border-white/30 ml-1">
                <Shield className="h-3.5 w-3.5" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* 4. Action Icons & Profile (Right side) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark Mode toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="rounded-full p-2 text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <span className="h-5 w-5 inline-block" />}
            </button>

            {/* Cart Icon trigger */}
            <button 
              onClick={toggleCart} 
              className="relative rounded-full p-2 text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#bd1f35] ring-2 ring-[#bd1f35] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              {!mounted ? (
                <div className="h-8 w-8 rounded-full bg-white/20 animate-pulse" />
              ) : isAuthenticated ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 focus:outline-none"
                >
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} 
                    alt={user?.name || 'User'} 
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white/80 object-cover" 
                  />
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-full border border-white/30 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}

              {/* Profile Dropdown Panel */}
              {mounted && isProfileOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 focus:outline-none z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.email}</p>
                    <span className="inline-block mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 capitalize">
                      {user?.role}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#bd1f35] dark:text-[#f17081] font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
              className="lg:hidden rounded-lg p-2 text-white hover:bg-white/15 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#8a0025] bg-[#bd1f35] px-4 py-4 space-y-3 text-white">
            {/* Mobile Location Selector */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLocationOpen(true);
              }}
              className="flex items-center justify-between py-2 px-3 bg-white/15 rounded-xl text-xs text-white cursor-pointer hover:bg-white/25 transition-colors border border-white/20"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white" />
                <span>Deliver to: <strong>{currentLocation.city} ({currentLocation.zip})</strong></span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-white/80" />
            </div>

            {/* Search (Mobile) */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-none bg-white py-1.5 pl-10 pr-20 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#8a0025] text-white rounded-full text-xs font-semibold"
              >
                Search
              </button>
            </form>
            <div className="flex flex-col gap-1 font-medium pt-2">
              <Link to="/" className="block py-2 px-2 hover:bg-white/10 rounded-lg text-white">Home</Link>
              <Link to="/shop" className="block py-2 px-2 hover:bg-white/10 rounded-lg text-white">Shop</Link>
              <Link to="/orders" className="block py-2 px-2 hover:bg-white/10 rounded-lg text-white">My Orders</Link>
              <Link to="/about" className="block py-2 px-2 hover:bg-white/10 rounded-lg text-white">About Us</Link>
              {mounted && isAuthenticated && (
                <Link to="/settings" className="block py-2 px-2 hover:bg-white/10 rounded-lg text-white">Settings</Link>
              )}
              {mounted && isAdmin && (
                <Link to="/admin" className="flex items-center gap-1.5 py-2 px-2 bg-white/20 rounded-lg text-white font-semibold">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* --- Main Storefront Canvas --- */}
      <main className="flex-grow">
        {children || <Outlet />}
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
                {(!cart || cart.length === 0) ? (
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
                    {(Array.isArray(cart) ? cart : []).map((item, idx) => (
                      <div key={item?.id || idx} className="flex py-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
                        <img 
                          src={getImageUrl(item?.image)} 
                          alt={item?.name || 'Product'} 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                          }}
                          className="h-20 w-20 rounded-lg object-contain p-1 border border-slate-200 dark:border-slate-800" 
                        />
                        <div className="ml-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-sm font-medium">
                              <h3 className="text-slate-900 dark:text-white truncate max-w-[150px]">{item?.name || 'Product'}</h3>
                              <p className="ml-2 text-slate-900 dark:text-indigo-400 font-semibold">
                                ₹{(Number(item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                              <button 
                                onClick={() => updateQuantity(item?.id, (item?.quantity || 1) - 1)}
                                className="p-1 hover:text-indigo-600"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 font-bold">{item?.quantity || 1}</span>
                              <button 
                                onClick={() => updateQuantity(item?.id, (item?.quantity || 1) + 1)}
                                className="p-1 hover:text-indigo-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item?.id)}
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

      {/* --- Modern E-Commerce Footer --- */}
      <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 dark:text-slate-400 border-t border-slate-800">
        
        {/* Back to Top Bar (Amazon Style) */}
        <button
          onClick={scrollToTop}
          type="button"
          className="w-full py-3 bg-slate-850 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-850 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-b border-slate-800"
        >
          <ChevronUp className="h-4 w-4" />
          <span>Back to Top</span>
        </button>

        {/* Main Footer Content Container (Full Width Edge-to-Edge) */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-14">
            
            {/* Col 1: Brand & Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img 
                  src={LogoImage?.src || LogoImage || '/logo.png'} 
                  alt="Likesszon Logo" 
                  className="h-9 w-9 object-contain rounded-full bg-white p-0.5 shadow-sm shrink-0" 
                />
                <span className="text-xl font-bold tracking-tight text-white select-none">Likesszon</span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your trusted online shopping destination for genuine computer hardware, professional camera & studio gear, and certified electrical supplies.
              </p>
              
              <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                <p className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-4 w-4 text-[#bd1f35] shrink-0" />
                  <span>Call Us: <a href="tel:9304264241" className="text-white font-semibold hover:underline">+91 9304264241</a></span>
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4 text-[#bd1f35] shrink-0" />
                  <span>Email: <a href="mailto:support@likesszon.com" className="text-white font-semibold hover:underline">support@likesszon.com</a></span>
                </p>
                <p className="flex items-start gap-2 text-slate-300 leading-relaxed">
                  <MapPin className="h-4 w-4 text-[#bd1f35] shrink-0 mt-0.5" />
                  <span>New Area 1st Gali Okni, Near Joda Shiv Mandir, Ward 20, Hazaribagh, Jharkhand - 825301</span>
                </p>
              </div>
            </div>

            {/* Col 2: Catalog Categories */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#bd1f35]" />
                <span>Product Catalog</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link to="/shop?category=computer-accessories-and-components" className="hover:text-white transition-colors">
                    Computers & Components
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=camera" className="hover:text-white transition-colors">
                    Cameras & Studio Gear
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=electrical" className="hover:text-white transition-colors">
                    Electrical Supplies & Wiring
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=accessories" className="hover:text-white transition-colors">
                    Accessories & Hardware
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-[#f17081] font-semibold hover:underline inline-flex items-center gap-1">
                    Browse All Products →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Support & Policies */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#bd1f35]" />
                <span>Customer Care</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/policies?tab=shipping" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
                <li><Link to="/policies?tab=returns" className="hover:text-white transition-colors">Return & Warranty Policy</Link></li>
                <li><Link to="/policies?tab=terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/policies?tab=privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Col 4: Newsletter & Safe Checkout */}
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#bd1f35]" />
                <span>Stay Connected</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Subscribe to get special discounts, deal alerts, and catalog updates.
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Likesszon updates!'); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#bd1f35] focus:ring-1 focus:ring-[#bd1f35] w-full"
                />
                <button 
                  type="submit" 
                  className="rounded-xl bg-gradient-to-r from-[#bd1f35] to-[#8a0025] hover:opacity-95 text-white font-bold text-xs px-4 py-2 transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  Join
                </button>
              </form>

              {/* Payment & Security Trust Badges */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  100% Safe & Secure Payment
                </span>
                <div className="flex flex-wrap items-center gap-2 text-slate-300 text-xs font-semibold">
                  <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-[10px]">UPI</span>
                  <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-[10px]">Cards</span>
                  <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-[10px]">NetBanking</span>
                  <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-[10px]">COD</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Assurances */}
          <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>&copy; {new Date().getFullYear()} Likesszon Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 flex-wrap justify-center">
              <span>🛡️ 100% Genuine Certified</span>
              <span>•</span>
              <span>⚡ Fast All-India Shipping</span>
              <span>•</span>
              <span>🔒 256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Add New Address Modal */}
      <AddAddressBottomModal 
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSaveAddress={handleSaveNewAddress}
      />

    </div>
  );
};

export default StoreLayout;
