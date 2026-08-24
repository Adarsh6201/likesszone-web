import React from 'react';
import { X, Calendar, MapPin, Download, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const AdminOrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const items = order.items || [];
  const subtotal = items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0) || order.total || 0;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const grandTotal = order.total || (subtotal + gstAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{order.id}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  order.paymentStatus === 'Paid'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                }`}>
                  {order.paymentStatus || 'Paid'}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                  {order.status || 'Pending'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Calendar className="h-3 w-3 text-indigo-500" />
                Ordered on {new Date(order.date || Date.now()).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Customer & Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer Details</span>
              <p className="text-xs font-extrabold text-slate-900 dark:text-white">{order.customerName || 'Customer'}</p>
              <p className="text-xs text-slate-500">{order.customerEmail || 'No Email'}</p>
              <p className="text-xs text-slate-500">{order.phone || '+91 9304264241'}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" /> Shipping Destination
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                {order.shippingDetails?.address || order.address || 'Standard Shipping Address'}
              </p>
              <p className="text-xs text-slate-400">
                {order.shippingDetails?.city || order.city || ''} {order.shippingDetails?.zip ? `- ${order.shippingDetails?.zip}` : ''}
              </p>
            </div>
          </div>

          {/* Purchased Items List Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items ({items.length})</h4>
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item, idx) => {
                const itemThumb = item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                return (
                  <div key={idx} className="flex justify-between items-center p-3.5 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-1 flex items-center justify-center shrink-0">
                        <img src={itemThumb} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity || 1} x ₹{(item.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financial Calculation Summary */}
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>GST (18% Included)</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Shipping Fee</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Grand Total Invoice</span>
              <span className="text-indigo-600 dark:text-indigo-400">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <CreditCard className="h-4 w-4 text-indigo-500" />
            <span>Payment Method: {order.paymentMethod || 'Card'}</span>
          </div>

          <button
            type="button"
            onClick={() => generateAndDownloadInvoice(order)}
            className="w-full sm:w-auto py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" /> Download Tax Invoice (PDF)
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminOrderDetailModal;
