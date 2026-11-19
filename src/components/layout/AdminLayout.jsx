import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, ShoppingCart, ShoppingBag, LogOut, ArrowLeft,
  ChevronLeft, ChevronRight, Menu, Bell, User, Shield, Sun, Moon, Tag, Sparkles,
  FileText, CreditCard, BookOpen, ExternalLink, X
} from 'lucide-react';
import LogoImage from '../../assets/logo.png';

const AdminLayout = ({ children }) => {
  const { user, logout, isDarkMode, setIsDarkMode } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile sidebar and profile dropdown on navigation
  useEffect(() => {
    setMobileSidebarOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      name: 'Overview',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Product Types',
      path: '/admin/product-types',
      icon: Tag,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: ShoppingBag,
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Invoices',
      path: '/admin/invoices',
      icon: FileText,
    },
    {
      name: 'Payment History',
      path: '/admin/payment-history',
      icon: CreditCard,
    },
    {
      name: 'Ledger',
      path: '/admin/ledger',
      icon: BookOpen,
    },
    {
      name: 'Schemes & Offers',
      path: '/admin/schemes',
      icon: Sparkles,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = (path) => {
    if (path === '/admin') return 'Dashboard Overview';
    if (path === '/admin/product-types') return 'Product Types';
    if (path === '/admin/products') return 'Products Catalog';
    if (path === '/admin/orders') return 'Customer Orders';
    if (path === '/admin/invoices') return 'Invoices & Billing';
    if (path === '/admin/payment-history') return 'Payment History';
    if (path === '/admin/ledger') return 'Financial Ledger';
    if (path === '/admin/schemes') return 'Schemes & Offers';
    
    // Fallback parser for subroutes
    const segment = path.replace('/admin', '').replace(/^\//, '').split('/')[0] || '';
    if (!segment) return 'Admin Console';
    return segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  };

  const isItemActive = (itemPath) => {
    if (itemPath === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* --- Desktop Sidebar --- */}
      <aside 
        className={`hidden md:flex flex-col bg-[#0f1117] text-slate-300 border-r border-[#1e222e] transition-all duration-300 shrink-0 select-none ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`h-16 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between px-4'} border-b border-[#1e222e] bg-[#0c0e13]/80`}>
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <img 
                    src={LogoImage?.src || LogoImage || '/logo.png'} 
                    alt="Likesszon Logo" 
                    className="h-8 w-8 object-contain rounded-full shadow-md ring-1 ring-white/20 bg-white" 
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#0c0e13]" title="Online"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-white truncate">Likesszon</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#bd1f35] to-[#8a0025] text-white shadow-xs">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Control Center</span>
                </div>
              </div>
              <button 
                onClick={() => setSidebarCollapsed(true)}
                className="rounded-lg p-1.5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setSidebarCollapsed(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all group flex flex-col items-center gap-1"
              title="Expand sidebar"
            >
              <img 
                src={LogoImage?.src || LogoImage || '/logo.png'} 
                alt="Likesszon Logo" 
                className="h-7 w-7 object-contain rounded-full shadow-md ring-1 ring-white/20 bg-white group-hover:scale-105 transition-transform" 
              />
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = isItemActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                title={sidebarCollapsed ? item.name : undefined}
                className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#bd1f35] via-[#a3152c] to-[#8a0025] text-white shadow-md shadow-[#bd1f35]/30 font-semibold border-l-4 border-amber-400' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#1e222e] bg-[#0c0e13]/60 space-y-1">
          <Link
            to="/"
            title={sidebarCollapsed ? "Back to Shop" : undefined}
            className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors`}
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-slate-400" />
            {!sidebarCollapsed && <span>Back to Shop</span>}
          </Link>
          <button
            onClick={handleLogout}
            title={sidebarCollapsed ? "Logout" : undefined}
            className={`flex w-full items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* --- Mobile Sidebar Overlay --- */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          ></div>
          <div className="relative w-64 bg-[#0f1117] text-slate-300 border-r border-[#1e222e] flex flex-col h-full z-10 p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e222e] mb-4">
              <div className="flex items-center gap-2.5">
                <img 
                  src={LogoImage?.src || LogoImage || '/logo.png'} 
                  alt="Likesszon Logo" 
                  className="h-8 w-8 object-contain rounded-full shadow-md ring-1 ring-white/20 bg-white" 
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white">Likesszon</span>
                    <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#bd1f35] to-[#8a0025] text-white">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Control Center</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-grow space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = isItemActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#bd1f35] via-[#a3152c] to-[#8a0025] text-white shadow-md shadow-[#bd1f35]/30 font-semibold border-l-4 border-amber-400' 
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="border-t border-[#1e222e] pt-3 space-y-1">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Shop</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Content Panel Wrapper --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Admin Top Header - Likesszon Crimson Gradient */}
        <header className="h-16 bg-gradient-to-r from-[#bd1f35] via-[#a3152c] to-[#8a0025] text-white border-b border-[#70001d] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.18)] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          
          {/* Hamburger trigger & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              title="Open Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-white/75">
                <span>Admin Console</span>
                <span className="text-white/40">/</span>
                <span className="text-white font-semibold">{pageTitle}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight drop-shadow-xs">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* View Live Store quick link */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 shadow-xs transition-all backdrop-blur-xs"
              title="Open Live Store in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-amber-300" />
              <span>Live Store</span>
            </Link>

            {/* Dark/Light Mode switch */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-full p-2 text-white/85 hover:text-white hover:bg-white/15 transition-colors"
            >
              {mounted ? (isDarkMode ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5" />) : <span className="h-5 w-5 inline-block" />}
            </button>

            {/* Notification alert */}
            <button 
              title="Notifications"
              className="relative rounded-full p-2 text-white/85 hover:text-white hover:bg-white/15 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-[#bd1f35]"></span>
            </button>

            {/* Profile Avatar Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 focus:outline-none transition-all"
                title="Account menu"
              >
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} 
                  alt="admin-avatar" 
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-white/60"
                />
                <div className="hidden lg:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-white">
                    {mounted ? (user?.name || 'Administrator') : 'Administrator'}
                  </span>
                  <span className="text-[10px] text-white/70 font-medium">Super Admin</span>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-slate-200 dark:border-[#1e222e] bg-white dark:bg-[#0f1117] p-2 shadow-xl focus:outline-none z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-[#1e222e] mb-1">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Signed in as</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.email || 'admin@likesszon.com'}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Super Admin
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 text-slate-500" />
                    Visit Shop
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

        </header>

        {/* --- Main Dashboard Canvas Outlet --- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] w-full mx-auto">
            {children || <Outlet />}
          </div>
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
