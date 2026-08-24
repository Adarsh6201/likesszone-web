import React from 'react';
import { Package, Download } from 'lucide-react';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const OrderItemsInvoice = ({ items = [], products = [], order = null }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Package className="h-4.5 w-4.5 text-indigo-500" />
          Ordered Items
        </h3>

        {order && (
          <button
            type="button"
            onClick={() => generateAndDownloadInvoice(order)}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Download Tax Invoice
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-3">
        {items.map((item, idx) => {
          const matchedProduct = products.find(p => p.id === item.productId || p.id === item.id);
          const thumb = item.image || matchedProduct?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
          
          return (
            <div key={idx} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-1 overflow-hidden shrink-0">
                  <img src={thumb} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-slate-400">Qty: {item.quantity} x ₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItemsInvoice;
