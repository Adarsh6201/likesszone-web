import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { FileText, Download, Search, Calendar, CheckCircle2 } from 'lucide-react';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const InvoiceManager = () => {
  const { orders } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      o.id.toLowerCase().includes(term) ||
      (o.customerName || '').toLowerCase().includes(term) ||
      (o.customerEmail || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Invoices Registry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access, view, and download official Tax Invoices for all customer transactions ({orders.length}).
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50 dark:bg-slate-850">
                <th className="py-3.5 px-6">Invoice Number</th>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer Details</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Grand Total (₹)</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No invoices found matching your query.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const invoiceNo = `INV-${order.id}`;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                        <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800/50">
                          <FileText className="h-3.5 w-3.5" />
                          {invoiceNo}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-semibold text-slate-700 dark:text-slate-300">
                        {order.id}
                      </td>

                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{order.customerName || 'Customer'}</p>
                          <p className="text-[10px] text-slate-400">{order.customerEmail || 'N/A'}</p>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-slate-500 font-medium">
                        {new Date(order.date || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

                      <td className="py-4 px-6 text-right font-extrabold text-slate-900 dark:text-white text-sm">
                        ₹{(order.total || 0).toFixed(2)}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                          <CheckCircle2 className="h-3 w-3" /> PAID
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => generateAndDownloadInvoice(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" /> Download Tax Invoice
                        </button>
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

export default InvoiceManager;
