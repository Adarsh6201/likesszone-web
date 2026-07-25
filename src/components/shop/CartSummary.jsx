import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartTotal, onCheckout }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-950 dark:text-white">₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Shipping</span>
          <span className="font-semibold text-slate-950 dark:text-white">Free</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Tax</span>
          <span className="font-semibold text-slate-950 dark:text-white">₹0.00</span>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
          <span>Estimated Total</span>
          <span className="text-lg text-indigo-600 dark:text-indigo-400">₹{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
      >
        Proceed to Checkout
        <ArrowRight className="h-5 w-5" />
      </button>

      <Link
        to="/shop"
        className="w-full flex items-center justify-center gap-1.5 py-1 text-sm font-semibold text-slate-505 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
