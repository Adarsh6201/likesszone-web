import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, LayoutDashboard, Layers, ArrowRight } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import StatsGrid from '../../components/admin/StatsGrid';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { summary, recentOrders, categoryDistribution, loading, error, fetchDashboardStats, lastUpdated } = useDashboard(true);

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-500">
              Live overview of store sales, catalog inventory, orders, and customer activity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {lastUpdated && (
            <span className="text-xs text-slate-400 hidden md:inline">
              Updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchDashboardStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Stats
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl text-sm">
          <strong>Notice:</strong> {error}
        </div>
      )}

      {/* Statistics Cards Grid */}
      <StatsGrid summary={summary} />

      {/* Two Column Layout: Recent Transactions + Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <RecentTransactionsTable 
            orders={recentOrders}
            onManageAll={() => navigate('/admin/orders')}
          />
        </div>

        {/* Right 1 Col: Category Inventory Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Categories Overview</h2>
            </div>
            <button
              onClick={() => navigate('/admin/categories')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {categoryDistribution && categoryDistribution.length > 0 ? (
              categoryDistribution.map((cat) => (
                <div 
                  key={cat.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cat.name}</p>
                    <p className="text-xs text-slate-400">Slug: {cat.slug}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg">
                    {cat.productCount} items
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No categories found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
