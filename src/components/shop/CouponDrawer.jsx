import React, { useState, useEffect } from 'react';
import { 
  Sparkles, X, Tag, CheckCircle2, AlertCircle, Search, 
  Percent, ShoppingCart, ShoppingBag, Calendar, Clock, ChevronRight
} from 'lucide-react';
import { useSchemes } from '../../hooks/useSchemes';

const CouponDrawer = ({ isOpen, onClose, cartItems = [] }) => {
  const { schemes, fetchSchemes, appliedScheme, applyLoading, applyScheme, removeAppliedScheme } = useSchemes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchSchemes();
    }
  }, [isOpen, fetchSchemes]);

  if (!isOpen) return null;

  const activeSchemes = schemes.filter((s) => s.isActive);

  // Filter by Tab and Search
  const filteredSchemes = activeSchemes.filter((s) => {
    const matchesTab = selectedTab === 'ALL' || s.type === selectedTab;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApply = async (code) => {
    setErrorMsg('');
    try {
      const cartPayload = cartItems.map((i) => ({
        productId: i.productId || i.id,
        price: i.price,
        quantity: i.quantity,
      }));

      await applyScheme(code, cartPayload);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to apply coupon');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Dark Blur Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Right Slide-over Drawer */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full border-l border-slate-200 dark:border-slate-800 transition-all">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-indigo-50/40 dark:bg-indigo-950/20">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Available Offers & Coupons</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select and apply the best discount code for your cart</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Currently Applied Active Banner */}
          {appliedScheme && (
            <div className="mx-6 mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Active Code Applied</p>
                  <span className="font-mono font-bold text-sm text-emerald-900 dark:text-emerald-200">{appliedScheme.code}</span>
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Saving ₹{appliedScheme.discountAmount.toFixed(2)} on this order!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeAppliedScheme}
                className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900/60 transition-colors"
              >
                Remove
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mx-6 mt-3 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Controls: Search & Category Tabs */}
          <div className="p-6 pb-3 space-y-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search coupon code or deal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {[
                { id: 'ALL', label: 'All Offers' },
                { id: 'FESTIVAL', label: 'Seasonal' },
                { id: 'MIN_CART_AMOUNT', label: 'Min Cart' },
                { id: 'PRODUCT_SPECIFIC', label: 'Product Specific' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3 py-1.2 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                    selectedTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Coupon Cards */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
            {filteredSchemes.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Tag className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No coupons found</p>
                <p className="text-xs">Check back later for exciting new deals & seasonal offers.</p>
              </div>
            ) : (
              filteredSchemes.map((scheme) => {
                const isCurrentlyApplied = appliedScheme?.code === scheme.code;

                return (
                  <div
                    key={scheme.id}
                    className={`relative rounded-2xl border p-4 transition-all space-y-3 ${
                      isCurrentlyApplied
                        ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-xs'
                    }`}
                  >
                    {/* Poster thumbnail if available */}
                    {scheme.bannerImage && (
                      <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                        <img src={scheme.bannerImage} alt={scheme.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-2.5">
                          <span className="text-white font-extrabold text-xs tracking-tight leading-tight line-clamp-1">{scheme.title}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {!scheme.bannerImage && (
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{scheme.title}</h3>
                        )}
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono font-bold text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 rounded-lg">
                            {scheme.code}
                          </span>

                          <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            {scheme.discountType === 'PERCENTAGE' ? `${scheme.discountValue}% OFF` : `₹${scheme.discountValue} FLAT OFF`}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={applyLoading || isCurrentlyApplied}
                        onClick={() => handleApply(scheme.code)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          isCurrentlyApplied
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                        }`}
                      >
                        {isCurrentlyApplied ? 'Applied' : 'Apply Code'}
                      </button>
                    </div>

                    {/* Offer Terms & Requirements */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                      {scheme.type === 'MIN_CART_AMOUNT' && (
                        <p className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                          <ShoppingCart className="h-3 w-3" /> Requires minimum cart total of ₹{scheme.minCartAmount}
                        </p>
                      )}
                      {scheme.type === 'PRODUCT_SPECIFIC' && (
                        <p className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium">
                          <ShoppingBag className="h-3 w-3" /> Applies specifically to target product in cart
                        </p>
                      )}
                      {scheme.type === 'FESTIVAL' && (
                        <p className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-400" /> Applicable to all cart items
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-0.5">
                        <Clock className="h-3 w-3" />
                        <span>Valid till {new Date(scheme.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center text-xs">
            <span className="text-slate-500">{activeSchemes.length} total offers available</span>
            <button
              onClick={onClose}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CouponDrawer;
