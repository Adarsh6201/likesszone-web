import React from 'react';
import { CreditCard, QrCode } from 'lucide-react';

const CheckoutForm = ({ formData, onChange, onSubmit, children }) => {
  const method = formData.paymentMethod || 'card';

  const selectMethod = (name) => {
    onChange({ target: { name: 'paymentMethod', value: name } });
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Forms (Shipping & Payment) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Shipping Address */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Shipping Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-505">First Name</label>
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
              <label className="text-xs font-semibold text-slate-550">Last Name</label>
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
            <label className="text-xs font-semibold text-slate-550">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-550">Address Line</label>
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
              <label className="text-xs font-semibold text-slate-550">City</label>
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
              <label className="text-xs font-semibold text-slate-550">ZIP Code</label>
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

        {/* Payment Options Block */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            Payment Method
          </h2>

          {/* Segmented Selectors */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'card', label: 'Card', icon: CreditCard },
              { id: 'upi', label: 'UPI Pay', icon: QrCode }
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = method === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectMethod(opt.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 text-xs font-bold border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-indigo-500 bg-indigo-50/30 text-indigo-700 dark:text-indigo-300 dark:border-indigo-500/50' 
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content 1: Card Details */}
          {method === 'card' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  required
                  value={formData.cardName || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-550">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={formData.cardNumber || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-550">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    required
                    placeholder="12/28"
                    value={formData.expiry || ''}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-550">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    required
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
                  required
                  placeholder="e.g. username@okhdfcbank"
                  value={formData.upiId || ''}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-[11px] text-slate-405 leading-relaxed">
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
