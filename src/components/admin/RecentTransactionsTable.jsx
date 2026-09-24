import React from 'react';

const RecentTransactionsTable = ({ orders = [], onManageAll }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h2>
          <p className="text-xs text-slate-500">Real-time status updates of customer checkouts.</p>
        </div>
        <button 
          onClick={onManageAll}
          className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
        >
          Manage All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-xs text-slate-400 italic">
                  No recent orders registered in the system yet.
                </td>
              </tr>
            ) : (
              orders.slice(0, 5).map((order) => {
                const orderDate = order.date || order.createdAt;
                const formattedDate = orderDate
                  ? new Date(orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'Recent';
                const totalAmount = Number(order.total || 0).toFixed(2);
                const custName = order.customerName || order.user?.name || 'Customer';
                const custEmail = order.customerEmail || order.user?.email || 'N/A';

                return (
                  <tr key={order.id || order.rawId} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {order.id ? (String(order.id).startsWith('ORD-') ? order.id : `ORD-${order.id}`) : `ORD-${order.rawId}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{custName}</p>
                        <p className="text-xs text-slate-500">{custEmail}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {formattedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-800 dark:text-slate-100">
                      ₹{totalAmount}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        order.status === 'Delivered' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                          : order.status === 'Processing' || order.status === 'Shipped'
                          ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                          : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                      }`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;
