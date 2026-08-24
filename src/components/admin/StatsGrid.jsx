import React from 'react';
import { IndianRupee, ShoppingBag, TrendingUp, Package, Users, Tag } from 'lucide-react';

const StatsGrid = ({ 
  summary,
  totalRevenue = 0, 
  pendingOrders = 0, 
  processingOrders = 0, 
  totalProducts = 0,
  totalUsers = 0,
  activeSchemes = 0,
}) => {
  const rev = summary ? summary.totalRevenue : totalRevenue;
  const pending = summary ? summary.pendingOrders : pendingOrders;
  const processing = summary ? summary.processingOrders : processingOrders;
  const products = summary ? summary.totalProducts : totalProducts;
  const users = summary ? summary.totalUsers : totalUsers;
  const schemes = summary ? summary.activeSchemes : activeSchemes;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      
      {/* Total Sales */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">₹{rev ? Number(rev).toFixed(2) : '0.00'}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
          <IndianRupee className="h-5 w-5" />
        </span>
      </div>

      {/* Pending Orders */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Orders</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{pending}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
          <TrendingUp className="h-5 w-5" />
        </span>
      </div>

      {/* Processing Orders */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processing</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{processing}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
          <ShoppingBag className="h-5 w-5" />
        </span>
      </div>

      {/* Products */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{products}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
          <Package className="h-5 w-5" />
        </span>
      </div>

      {/* Customers / Users */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customers</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{users}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400">
          <Users className="h-5 w-5" />
        </span>
      </div>

      {/* Active Schemes */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Schemes</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">{schemes}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400">
          <Tag className="h-5 w-5" />
        </span>
      </div>

    </div>
  );
};

export default StatsGrid;
