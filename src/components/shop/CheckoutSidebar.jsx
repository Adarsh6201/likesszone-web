import React from 'react';
import { ShieldCheck } from 'lucide-react';

const CheckoutSidebar = ({ cart = [], cartTotal }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Checkout Total</h2>

      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-xs py-2">
            <div className="truncate max-w-[150px]">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
              <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
        <span>Total Price</span>
        <span className="text-lg text-indigo-600 dark:text-indigo-400">₹{cartTotal.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-transform active:scale-95 cursor-pointer"
      >
        Pay ₹{cartTotal.toFixed(2)}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 py-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
        <ShieldCheck className="h-4.5 w-4.5" />
        <span>SSL 256-bit Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
export { CheckoutSidebar };
