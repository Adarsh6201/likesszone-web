import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Tag, Sparkles, CheckCircle2, X, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSchemes } from '../../hooks/useSchemes';
import { useCart } from '../../hooks/useCart';
import CouponDrawer from './CouponDrawer';

const CartSummary = ({ cartTotal, onCheckout }) => {
  const { cart } = useCart();
  const { schemes, fetchSchemes, appliedScheme, applyLoading, applyScheme, removeAppliedScheme } = useSchemes();
  const [couponCode, setCouponCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const activeSchemes = schemes.filter((s) => s.isActive);

  const applyCodeDirectly = async (codeToApply) => {
    setErrorMsg('');
    try {
      const cartItemsPayload = cart.map((i) => ({
        productId: i.productId || i.id,
        price: i.price,
        quantity: i.quantity,
      }));

      await applyScheme(codeToApply, cartItemsPayload);
      setCouponCode('');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid or expired offer code');
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    await applyCodeDirectly(couponCode.trim());
  };

  const discountAmount = appliedScheme ? appliedScheme.discountAmount : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-6">
      
      {/* Coupon Drawer Modal / Sidebar */}
      <CouponDrawer
        isOpen={isCouponDrawerOpen}
        onClose={() => setIsCouponDrawerOpen(false)}
        cartItems={cart}
      />

      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-indigo-600" />
        Order Summary
      </h2>

      {/* Offer Code Input Box */}
      <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Have an Offer or Promo Code?
          </label>
          {activeSchemes.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCouponDrawerOpen(true)}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <Sparkles className="h-3 w-3 text-indigo-500" />
              View All ({activeSchemes.length})
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>

        {appliedScheme ? (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">{appliedScheme.code}</span>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Saving ₹{appliedScheme.discountAmount.toFixed(2)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeAppliedScheme}
              className="text-emerald-700 dark:text-emerald-300 hover:text-red-600 p-1 rounded-lg transition-colors"
              title="Remove offer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code (e.g. MONSOON25)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs uppercase text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={applyLoading || !couponCode.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all"
            >
              {applyLoading ? '...' : 'Apply'}
            </button>
          </form>
        )}

        {errorMsg && (
          <div className="flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 pt-1">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* List of Available Coupons */}
        {!appliedScheme && activeSchemes.length > 0 && (
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Available Offers ({activeSchemes.length})
              </p>
              <button
                type="button"
                onClick={() => setIsCouponDrawerOpen(true)}
                className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Expand Drawer
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {activeSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-2.5 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl flex items-center justify-between gap-2 transition-all hover:border-indigo-300"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-[11px] bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-md">
                        {scheme.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {scheme.discountType === 'PERCENTAGE' ? `${scheme.discountValue}% OFF` : `₹${scheme.discountValue} OFF`}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate" title={scheme.title}>
                      {scheme.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyCodeDirectly(scheme.code)}
                    disabled={applyLoading}
                    className="px-3 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-xs flex-shrink-0"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-3 text-sm pt-2">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-950 dark:text-white">₹{cartTotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" /> Discount ({appliedScheme?.code})
            </span>
            <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}

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
          <span className="text-lg text-indigo-600 dark:text-indigo-400">₹{finalTotal.toFixed(2)}</span>
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
        className="w-full flex items-center justify-center gap-1.5 py-1 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
