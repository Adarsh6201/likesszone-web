import React from 'react';
import { IndianRupee, ShoppingBag, TrendingUp, Users } from 'lucide-react';

const StatsGrid = ({ totalRevenue, pendingOrders, processingOrders, totalProducts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Card 1 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">₹{totalRevenue.toFixed(2)}</h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
          <IndianRupee className="h-6 w-6" />
        </span>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Orders</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{pendingOrders}</h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
          <TrendingUp className="h-6 w-6" />
        </span>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processing Logs</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{processingOrders}</h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
          <ShoppingBag className="h-6 w-6" />
        </span>
      </div>

      {/* Card 4 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalog Inventory</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalProducts} Items</h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400">
          <Users className="h-6 w-6" />
        </span>
      </div>

    </div>
  );
};

export default StatsGrid;
