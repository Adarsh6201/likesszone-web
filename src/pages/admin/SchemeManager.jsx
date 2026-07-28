import React, { useState, useEffect } from 'react';
import { useSchemes } from '../../hooks/useSchemes';
import { useProducts } from '../../hooks/useProducts';
import {
  Tag, Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle,
  Calendar, Percent, DollarSign, ShoppingBag, ShoppingCart, Sparkles,
  X, AlertCircle
} from 'lucide-react';

const SchemeManager = () => {
  const { schemes, loading, fetchSchemes, addScheme, updateScheme, deleteScheme } = useSchemes();
  const { products } = useProducts();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [isCustomCode, setIsCustomCode] = useState(false);

  // Helper to auto-generate a clean coupon code from title and discount value
  const generateCouponCode = (title = '', discountValue = '') => {
    if (!title.trim() && !discountValue) return '';

    const cleanWords = title
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => !['OFF', 'SALE', 'PERCENT', 'DISCOUNT', 'RS', 'INR', 'SCHEME'].includes(w) && w.length > 0);

    let prefix = 'OFFER';
    if (cleanWords.length > 0) {
      prefix = cleanWords.slice(0, 2).join('');
      if (prefix.length > 8) prefix = prefix.substring(0, 8);
    } else {
      const rawWords = title.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (rawWords.length > 0) prefix = rawWords.substring(0, 8);
    }

    const val = discountValue ? Math.round(Number(discountValue)).toString() : '';
    return (prefix + val).toUpperCase();
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    type: 'FESTIVAL',
    discountType: 'PERCENTAGE',
    discountValue: '',
    minCartAmount: '',
    productId: '',
    bannerImage: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
  });

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const handleOpenForm = (scheme = null) => {
    setFormError('');
    setIsCustomCode(!!scheme);
    if (scheme) {
      setEditingScheme(scheme);
      setFormData({
        title: scheme.title,
        code: scheme.code,
        type: scheme.type,
        discountType: scheme.discountType,
        discountValue: scheme.discountValue.toString(),
        minCartAmount: scheme.minCartAmount ? scheme.minCartAmount.toString() : '',
        productId: scheme.productId || '',
        bannerImage: scheme.bannerImage || '',
        startDate: new Date(scheme.startDate).toISOString().split('T')[0],
        endDate: new Date(scheme.endDate).toISOString().split('T')[0],
        isActive: scheme.isActive,
      });
    } else {
      setEditingScheme(null);
      setFormData({
        title: '',
        code: '',
        type: 'FESTIVAL',
        discountType: 'PERCENTAGE',
        discountValue: '',
        minCartAmount: '',
        productId: '',
        bannerImage: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: true,
      });
    }
    setIsFormOpen(true);

    // Scroll smoothly to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingScheme(null);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim() || !formData.code.trim() || !formData.discountValue) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (formData.type === 'MIN_CART_AMOUNT' && (!formData.minCartAmount || Number(formData.minCartAmount) <= 0)) {
      setFormError('Please specify a valid minimum cart amount threshold.');
      return;
    }

    if (formData.type === 'PRODUCT_SPECIFIC' && !formData.productId) {
      setFormError('Please select a target product for this offer.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        code: formData.code.trim().toUpperCase(),
        type: formData.type,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minCartAmount: formData.type === 'MIN_CART_AMOUNT' ? Number(formData.minCartAmount) : 0,
        productId: formData.type === 'PRODUCT_SPECIFIC' ? formData.productId : null,
        bannerImage: formData.bannerImage.trim() || null,
        startDate: new Date(`${formData.startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${formData.endDate}T23:59:59.000Z`).toISOString(),
        isActive: formData.isActive,
      };

      if (editingScheme) {
        await updateScheme(editingScheme.id, payload);
      } else {
        await addScheme(payload);
      }

      handleCloseForm();
    } catch (err) {
      setFormError(err.message || 'Failed to save scheme.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (scheme) => {
    try {
      await updateScheme(scheme.id, { isActive: !scheme.isActive });
    } catch (err) {
      alert('Failed to update scheme status');
    }
  };

  const handleDelete = async (scheme) => {
    if (window.confirm(`Are you sure you want to delete the offer scheme "${scheme.title}"?`)) {
      try {
        await deleteScheme(scheme.id);
      } catch (err) {
        alert('Failed to delete scheme');
      }
    }
  };

  // Filter schemes
  const filteredSchemes = schemes.filter((s) => {
    const matchesTab = activeTab === 'ALL' || s.type === activeTab;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeCount = schemes.filter((s) => s.isActive).length;
  const festivalCount = schemes.filter((s) => s.type === 'FESTIVAL').length;
  const minCartCount = schemes.filter((s) => s.type === 'MIN_CART_AMOUNT').length;
  const productCount = schemes.filter((s) => s.type === 'PRODUCT_SPECIFIC').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Schemes & Offers Section</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create festival deals, minimum cart threshold offers, and product-specific discounts.
          </p>
        </div>

        <button
          onClick={() => {
            if (isFormOpen && !editingScheme) {
              handleCloseForm();
            } else {
              handleOpenForm();
            }
          }}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none text-sm"
        >
          {isFormOpen && !editingScheme ? (
            <>
              <X className="h-4.5 w-4.5" />
              Close Form
            </>
          ) : (
            <>
              <Plus className="h-4.5 w-4.5" />
              Create New Scheme
            </>
          )}
        </button>
      </div>

      {/* Inline Create / Edit Form Card (In-Screen) */}
      {isFormOpen && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 shadow-lg overflow-hidden transition-all">
          
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-950/30">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {editingScheme ? 'Edit Offer Scheme' : 'Create New Offer Scheme'}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Inline Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {formError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Title & Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Scheme Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Mega Sale 20% OFF"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const autoCode = generateCouponCode(newTitle, formData.discountValue);
                    setFormData((prev) => ({
                      ...prev,
                      title: newTitle,
                      code: isCustomCode ? prev.code : autoCode,
                    }));
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Coupon Code * (Uppercase)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const autoCode = generateCouponCode(formData.title, formData.discountValue);
                      if (autoCode) {
                        setIsCustomCode(false);
                        setFormData((prev) => ({ ...prev, code: autoCode }));
                      }
                    }}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors"
                    title="Generate code from title & discount value"
                  >
                    <Sparkles className="h-3 w-3 text-indigo-500" />
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI20 (Auto-generated)"
                  value={formData.code}
                  onChange={(e) => {
                    setIsCustomCode(true);
                    setFormData({ ...formData, code: e.target.value.toUpperCase() });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono uppercase text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Scheme Category Type */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Scheme Type (Select Condition) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'FESTIVAL', label: 'Festival & Seasonal', desc: 'Applies to any order' },
                  { id: 'MIN_CART_AMOUNT', label: 'Min Cart Amount', desc: 'Cart total threshold' },
                  { id: 'PRODUCT_SPECIFIC', label: 'Product Specific', desc: 'Target product only' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t.id })}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      formData.type === t.id
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-semibold text-xs">{t.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Inputs based on Scheme Type */}
            {formData.type === 'MIN_CART_AMOUNT' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                <label className="block font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  Minimum Cart Amount Threshold (₹) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 2000 (User must have at least ₹2000 in cart)"
                  value={formData.minCartAmount}
                  onChange={(e) => setFormData({ ...formData, minCartAmount: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">
                  Users can only apply this code when their total cart value is greater than or equal to this amount.
                </p>
              </div>
            )}

            {formData.type === 'PRODUCT_SPECIFIC' && (
              <div className="p-3 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl">
                <label className="block font-semibold text-sky-800 dark:text-sky-300 mb-1">
                  Target Product *
                </label>
                <select
                  required
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">-- Select Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-sky-700 dark:text-sky-400 mt-1">
                  Discount will only apply specifically to the selected product in the user's cart.
                </p>
              </div>
            )}

            {/* Discount Type & Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Discount Type *
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="PERCENTAGE">Percentage (% OFF)</option>
                  <option value="FLAT_AMOUNT">Flat Amount (₹ OFF)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Discount Value * ({formData.discountType === 'PERCENTAGE' ? '%' : '₹'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  required
                  placeholder={formData.discountType === 'PERCENTAGE' ? 'e.g. 20 (for 20% OFF)' : 'e.g. 200 (for ₹200 OFF)'}
                  value={formData.discountValue}
                  onChange={(e) => {
                    const newDiscount = e.target.value;
                    const autoCode = generateCouponCode(formData.title, newDiscount);
                    setFormData((prev) => ({
                      ...prev,
                      discountValue: newDiscount,
                      code: isCustomCode ? prev.code : autoCode,
                    }));
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Scheme Poster / Banner Image URL */}
            <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/80 rounded-xl space-y-2">
              <label className="block font-semibold text-slate-800 dark:text-slate-200">
                Scheme Poster / Banner Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or image poster URL"
                value={formData.bannerImage}
                onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                If provided, this poster/banner image will automatically be featured on the shop's Home page banner!
              </p>
              {formData.bannerImage && (
                <div className="mt-2 relative h-28 rounded-lg overflow-hidden border border-indigo-200 dark:border-indigo-800">
                  <img src={formData.bannerImage} alt="Poster preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2 text-white font-bold text-[11px]">
                    Banner Preview
                  </div>
                </div>
              )}
            </div>

            {/* Start & End Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Is Active Toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <label htmlFor="isActive" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                Active immediately upon creation
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingScheme ? 'Update Scheme' : 'Create Scheme'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Offers</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{activeCount} / {schemes.length}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Festival & Seasonal</p>
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{festivalCount}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Min Cart Threshold</p>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{minCartCount}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Product Specific</p>
            <h3 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">{productCount}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Schemes' },
            { id: 'FESTIVAL', label: 'Festival & Seasonal' },
            { id: 'MIN_CART_AMOUNT', label: 'Min Cart Amount' },
            { id: 'PRODUCT_SPECIFIC', label: 'Product Specific' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Schemes Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">Loading schemes & offers...</div>
        ) : filteredSchemes.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Tag className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">No schemes found</p>
            <p className="text-xs">Create your first offer scheme using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Scheme Code & Title</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Discount</th>
                  <th className="py-3.5 px-4">Target Condition</th>
                  <th className="py-3.5 px-4">Validity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredSchemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Code & Title */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {scheme.bannerImage ? (
                          <img
                            src={scheme.bannerImage}
                            alt="Poster"
                            className="h-9 w-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm"
                            title="Scheme Poster Image"
                          />
                        ) : (
                          <span className="font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 px-2.5 py-1 rounded-lg text-xs">
                            {scheme.code}
                          </span>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                            {scheme.title}
                            {scheme.bannerImage && (
                              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                                {scheme.code}
                              </span>
                            )}
                          </p>
                          {scheme.bannerImage && (
                            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                              📷 Poster Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Scheme Type Badge */}
                    <td className="py-4 px-4">
                      {scheme.type === 'FESTIVAL' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          <Sparkles className="h-3 w-3" /> Festival
                        </span>
                      )}
                      {scheme.type === 'MIN_CART_AMOUNT' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                          <ShoppingCart className="h-3 w-3" /> Min Cart Total
                        </span>
                      )}
                      {scheme.type === 'PRODUCT_SPECIFIC' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                          <ShoppingBag className="h-3 w-3" /> Product Offer
                        </span>
                      )}
                    </td>

                    {/* Discount Value */}
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                      {scheme.discountType === 'PERCENTAGE' ? (
                        <span className="text-emerald-600 dark:text-emerald-400">{scheme.discountValue}% OFF</span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400">₹{scheme.discountValue} FLAT OFF</span>
                      )}
                    </td>

                    {/* Target Condition */}
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {scheme.type === 'MIN_CART_AMOUNT' && (
                        <span>Cart Total ≥ ₹{scheme.minCartAmount}</span>
                      )}
                      {scheme.type === 'PRODUCT_SPECIFIC' && (
                        <span className="truncate max-w-[140px] block" title={scheme.product?.name}>
                          {scheme.product?.name || 'Selected Product'}
                        </span>
                      )}
                      {scheme.type === 'FESTIVAL' && <span>All Cart Items</span>}
                    </td>

                    {/* Validity Dates */}
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{new Date(scheme.startDate).toLocaleDateString()} - {new Date(scheme.endDate).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(scheme)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          scheme.isActive
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {scheme.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {scheme.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenForm(scheme)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit Scheme"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(scheme)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Delete Scheme"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeManager;
