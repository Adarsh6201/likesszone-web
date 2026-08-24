import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { CreditCard, Search, ShieldCheck, ArrowUpRight, DollarSign, Calendar } from 'lucide-react';

const PaymentHistoryManager = () => {
  const { orders } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const totalCollected = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const paidCount = orders.filter(o => (o.paymentStatus || 'Paid') === 'Paid').length;

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      o.id.toLowerCase().includes(term) ||
      (o.customerName || '').toLowerCase().includes(term) ||
      (o.customerEmail || '').toLowerCase().includes(term) ||
      (o.paymentMethod || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            Payment Transaction History
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit log of customer payment checkouts, payment methods, and transaction statuses.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Revenue Collected</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">₹{totalCollected.toFixed(2)}</p>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">100% Processed via Gateway</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Successful Transactions</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{paidCount}</p>
          <span className="text-[10px] text-slate-400">Out of {orders.length} total orders</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment Gateways</span>
          <p className="text-base font-extrabold text-slate-900 dark:text-white mt-1">Card / UPI Pay</p>
          <span className="text-[10px] text-slate-400">Instant Settlements active</span>
        </div>
      </div>

      {/* Payment Transactions Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50 dark:bg-slate-850">
                <th className="py-3.5 px-6">Payment ID</th>
                <th className="py-3.5 px-6">Order Ref</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6 text-right">Amount Paid</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No payment history transactions found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => {
                  const payId = `PAY-${order.id.replace('ORD-', '')}`;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                        <span className="font-mono">{payId}</span>
                      </td>

                      <td className="py-4 px-6 font-semibold text-indigo-600 dark:text-indigo-400">
                        {order.id}
                      </td>

                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{order.customerName || 'Customer'}</p>
                          <p className="text-[10px] text-slate-400">{order.customerEmail || 'N/A'}</p>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
                          <CreditCard className="h-3.5 w-3.5 text-indigo-500" />
                          {order.paymentMethod || 'Card'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right font-extrabold text-slate-900 dark:text-white text-sm">
                        ₹{(order.total || 0).toFixed(2)}
                      </td>

                      <td className="py-4 px-6 text-slate-400 text-[11px]">
                        {new Date(order.date || Date.now()).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                          <ShieldCheck className="h-3 w-3" /> Paid
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

    </div>
  );
};

export default PaymentHistoryManager;
