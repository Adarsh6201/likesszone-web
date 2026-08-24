import React from 'react';
import { CreditCard, QrCode, MapPin, Plus, Home, Briefcase, Tag, Check, ChevronRight, Shield } from 'lucide-react';

const CheckoutForm = ({
  formData,
  onChange,
  onSubmit,
  selectedAddress,
  savedAddresses = [],
  onOpenSelectModal,
  onOpenAddModal,
  children,
}) => {
  const method = formData.paymentMethod || 'card';

  const selectMethod = (name) => {
    onChange({ target: { name: 'paymentMethod', value: name } });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Home': return Home;
      case 'Work': return Briefcase;
      default: return Tag;
    }
  };

  const TagIcon = getTypeIcon(selectedAddress?.type || 'Home');

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Forms (Shipping & Payment) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Shipping Address Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Address</h2>
                <p className="text-xs text-slate-400">Select where you want your order delivered</p>
              </div>
            </div>

            {/* Header Actions: See All & Add Address */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenSelectModal}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                See All ({savedAddresses.length}) <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={onOpenAddModal}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Address
              </button>
            </div>
          </div>

          {/* Highlighted Selected Address Card */}
          {selectedAddress ? (
            <div className="relative p-5 rounded-2xl border-2 border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {selectedAddress.name || `${formData.firstName} ${formData.lastName}`}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-600 text-white shadow-xs">
                    <TagIcon className="h-2.5 w-2.5" />
                    {selectedAddress.type || 'Home'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onOpenSelectModal}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state || ''} - <span className="font-bold">{selectedAddress.zip || formData.zip}</span>
              </p>

              {selectedAddress.phone && (
                <p className="text-[11px] text-slate-400">
                  Phone: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedAddress.phone}</span>
                </p>
              )}
            </div>
          ) : (
            /* Fallback Form Inputs if no address selected */
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Address Line</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-500">Email Address for Invoice & Tracking Updates</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Payment Options Block */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            Payment Method
          </h2>

          {/* Segmented Selectors */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'razorpay', label: 'Razorpay Pay', icon: CreditCard },
              { id: 'card', label: 'Card Details', icon: CreditCard },
              { id: 'upi', label: 'UPI Pay', icon: QrCode }
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = method === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectMethod(opt.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-3 text-xs font-bold border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-indigo-500 bg-indigo-50/40 text-indigo-700 dark:text-indigo-300 dark:border-indigo-500/50 ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content 0: Razorpay Info Banner */}
          {method === 'razorpay' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/30 p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold">
                  <Shield className="h-4 w-4 text-indigo-600" />
                  <span>Official Razorpay Payment Gateway</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Clicking "Place Order" will launch the official Razorpay Checkout popup modal where you can pay securely via <strong>UPI (PhonePe, GPay, Paytm)</strong>, <strong>Debit/Credit Cards</strong>, <strong>Net Banking</strong>, or <strong>Wallets</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 1: Card Details */}
          {method === 'card' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  required={method === 'card'}
                  value={formData.cardName || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required={method === 'card'}
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={formData.cardNumber || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    required={method === 'card'}
                    placeholder="12/28"
                    value={formData.expiry || ''}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    required={method === 'card'}
                    maxLength="3"
                    placeholder="***"
                    value={formData.cvv || ''}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: UPI ID */}
          {method === 'upi' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">UPI Address (VPA)</label>
                <input
                  type="text"
                  name="upiId"
                  required={method === 'upi'}
                  placeholder="e.g. username@okhdfcbank"
                  value={formData.upiId || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-[11px] text-slate-400 leading-relaxed">
                Enter your UPI ID (Virtual Payment Address). You will receive a mobile notification or verification request in your default UPI application (PhonePe, GPay, Paytm) to finalize payment.
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Sidebar Column */}
      <div className="space-y-6">
        {children}
      </div>

    </form>
  );
};

export default CheckoutForm;
