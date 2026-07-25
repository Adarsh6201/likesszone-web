import React from 'react';
import { Search } from 'lucide-react';

const OrderSearchSidebar = ({ searchId, onSearchIdChange, onSearchSubmit, orders = [], selectedOrderId, onSelectOrder }) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      
      {/* Order Search panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Track Order</h2>
          <p className="text-xs text-slate-500 mt-0.5">Enter your order ID below to verify tracking checkpoints.</p>
        </div>

        <form onSubmit={onSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            placeholder="e.g. ORD-1002"
            value={searchId}
            onChange={(e) => onSearchIdChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-2.5 text-xs font-semibold outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-1.5 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* List of recent orders for easy testing */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Store Orders (Testing)</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Click any order code to load its details and tracking timeline.</p>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">No orders registered in the system yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-80 overflow-y-auto space-y-1.5">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => onSelectOrder(ord.id)}
                className={`w-full text-left rounded-xl p-3 flex justify-between items-center text-xs font-semibold border transition-all ${
                  selectedOrderId === ord.id 
                    ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300' 
                    : 'border-transparent text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-850'
                }`}
              >
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white">{ord.id}</p>
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">{ord.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-slate-950 dark:text-white">₹{ord.total.toFixed(2)}</p>
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${
                    ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' :
                    ord.status === 'Shipped' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400' :
                    ord.status === 'Processing' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderSearchSidebar;
