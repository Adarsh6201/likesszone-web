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
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
                <td className="py-3.5 px-4">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</p>
                    <p className="text-xs text-slate-500">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-4 text-right font-semibold text-slate-800 dark:text-slate-100">
                  ₹{order.total.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    order.status === 'Delivered' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                      : order.status === 'Processing' || order.status === 'Shipped'
                      ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                      : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    order.paymentStatus === 'Paid'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;
