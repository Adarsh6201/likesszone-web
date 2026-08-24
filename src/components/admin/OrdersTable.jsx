import React, { useState } from 'react';
import { Calendar, User, Eye, Download, LayoutGrid, Table } from 'lucide-react';
import AdminOrderDetailModal from './AdminOrderDetailModal';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const OrdersTable = ({ orders = [], onStatusChange, onPaymentChange }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Data Grid Table) or 'cards'

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* View Switcher Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-1">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Click on any order row to view complete details & invoice modal.
        </span>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table className="h-3.5 w-3.5" /> Grid Table
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Cards
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Data Grid Table View */
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Purchased Item(s)</th>
                  <th className="py-3.5 px-4 text-right">Total Amount</th>
                  <th className="py-3.5 px-4">Fulfillment</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {orders.map((order) => {
                  const items = order.items || [];
                  const firstItem = items[0];
                  const itemThumb = firstItem?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

                  return (
                    <tr
                      key={order.id}
                      onClick={() => handleRowClick(order)}
                      className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      {/* Order ID & Date */}
                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {order.id}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                          <Calendar className="h-3 w-3 text-indigo-500" />
                          {new Date(order.date || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 max-w-[140px] sm:max-w-[180px]">
                            <p className="font-bold text-slate-900 dark:text-white truncate">
                              {order.customerName || 'Customer'}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {order.customerEmail || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Items Preview */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5 min-w-0 max-w-[220px]">
                          <div className="h-8 w-8 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 flex items-center justify-center shrink-0">
                            <img src={itemThumb} alt="" className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-800 dark:text-slate-200 truncate text-xs">
                              {firstItem?.name || 'Product'}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {items.length > 1 ? `+${items.length - 1} more item(s)` : `Qty: ${firstItem?.quantity || 1}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3.5 px-4 text-right font-black text-slate-900 dark:text-white whitespace-nowrap">
                        ₹{(order.total || 0).toFixed(2)}
                      </td>

                      {/* Fulfillment Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={(e) => onStatusChange(order.id, e.target.value)}
                          className="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer focus:border-indigo-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Payment Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => onPaymentChange(order.id, e.target.value)}
                          className={`rounded-xl border px-2.5 py-1 text-xs font-bold outline-none cursor-pointer ${
                            order.paymentStatus === 'Paid'
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          }`}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleRowClick(order)}
                            className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="View Full Details"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => generateAndDownloadInvoice(order)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                            title="Download Invoice"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const items = order.items || [];
            const firstItem = items[0];
            const itemThumb = firstItem?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={order.id}
                onClick={() => handleRowClick(order)}
                className="group bg-white dark:bg-slate-900 border-[1.5px] border-slate-300 dark:border-slate-700 rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)] dark:shadow-none hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.18)] hover:border-indigo-600 dark:hover:border-indigo-500 transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between"
              >
                {/* Card Header: Order ID & Date */}
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {order.id}
                    </h3>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-indigo-500" />
                    {new Date(order.date || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {order.customerName || 'Customer'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {order.customerEmail || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Product Preview Snippet */}
                <div className="bg-slate-50/70 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex items-center justify-center shrink-0">
                    <img src={itemThumb} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {firstItem?.name || 'Product'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {items.length > 1 ? `+ ${items.length - 1} more items` : `Qty: ${firstItem?.quantity || 1}`}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white shrink-0">
                    ₹{(order.total || 0).toFixed(2)}
                  </span>
                </div>

                {/* Status Selectors & Quick Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Fulfillment</label>
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none dark:border-slate-800 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Payment</label>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => onPaymentChange(order.id, e.target.value)}
                      className={`w-full rounded-xl border px-2 py-1.5 text-xs outline-none font-bold cursor-pointer ${
                        order.paymentStatus === 'Paid'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                {/* Footer Click Trigger */}
                <div className="flex justify-between items-center pt-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Eye className="h-3.5 w-3.5" /> View Details & Invoice
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      generateAndDownloadInvoice(order);
                    }}
                    className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Download Tax Invoice"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Order Details & Invoice Modal */}
      <AdminOrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersTable;
