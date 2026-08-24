import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { BookOpen, TrendingUp, ArrowDownRight, ArrowUpRight, DollarSign, Search, ShieldCheck } from 'lucide-react';

const LedgerManager = () => {
  const { orders } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const totalSalesRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalPaidCollections = orders
    .filter((o) => (o.paymentStatus || 'Paid') === 'Paid')
    .reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingReceivables = totalSalesRevenue - totalPaidCollections;

  // Build ledger entries from orders
  let runningBalance = 0;
  const ledgerEntries = orders.map((order, idx) => {
    const amount = order.total || 0;
    const isPaid = (order.paymentStatus || 'Paid') === 'Paid';
    runningBalance += isPaid ? amount : 0;

    return {
      voucherNo: `VCH-${order.id.replace('ORD-', '')}`,
      orderId: order.id,
      date: new Date(order.date || Date.now()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      particulars: `Sales Checkout - ${order.items?.length || 1} Products`,
      customer: order.customerName || 'Customer',
      type: isPaid ? 'CREDIT' : 'DEBIT',
      credit: isPaid ? amount : 0,
      debit: isPaid ? 0 : amount,
      balance: runningBalance,
    };
  });

  const filteredEntries = ledgerEntries.filter((entry) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      entry.voucherNo.toLowerCase().includes(term) ||
      entry.orderId.toLowerCase().includes(term) ||
      entry.customer.toLowerCase().includes(term) ||
      entry.particulars.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            Financial General Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete double-entry accounting ledger of credits, debit receivables, and net running balance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ledger entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Accounting Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Gross Sales Volume</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">₹{totalSalesRevenue.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400 font-semibold">{orders.length} total customer orders</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Paid Collections (Credit)</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{totalPaidCollections.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Realized cash in flow</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Receivables (Debit)</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">₹{pendingReceivables.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Awaiting payment fulfillment</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Net Running Balance</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{runningBalance.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Current ledger balance</p>
        </div>

      </div>

      {/* Credit/Debit Accounting Ledger Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Ledger Journal Entries ({filteredEntries.length})
          </h3>
          <span className="text-[10px] font-bold text-slate-400">Auto-Reconciled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50 dark:bg-slate-850">
                <th className="py-3.5 px-6">Voucher No</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Order Ref</th>
                <th className="py-3.5 px-6">Particulars / Description</th>
                <th className="py-3.5 px-6">Customer / Account</th>
                <th className="py-3.5 px-6 text-right">Credit (+₹)</th>
                <th className="py-3.5 px-6 text-right">Debit (-₹)</th>
                <th className="py-3.5 px-6 text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400">
                    No ledger entries found.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white font-mono">
                      {entry.voucherNo}
                    </td>

                    <td className="py-4 px-6 text-slate-500">
                      {entry.date}
                    </td>

                    <td className="py-4 px-6 font-semibold text-indigo-600 dark:text-indigo-400">
                      {entry.orderId}
                    </td>

                    <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                      {entry.particulars}
                    </td>

                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">
                      {entry.customer}
                    </td>

                    <td className="py-4 px-6 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {entry.credit > 0 ? `+₹${entry.credit.toFixed(2)}` : '—'}
                    </td>

                    <td className="py-4 px-6 text-right font-bold text-amber-600 dark:text-amber-400">
                      {entry.debit > 0 ? `-₹${entry.debit.toFixed(2)}` : '—'}
                    </td>

                    <td className="py-4 px-6 text-right font-extrabold text-slate-900 dark:text-white">
                      ₹{entry.balance.toFixed(2)}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LedgerManager;
