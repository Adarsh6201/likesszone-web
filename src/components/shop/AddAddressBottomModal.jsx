import React, { useState } from 'react';
import { X, MapPin, Home, Briefcase, Tag, Check } from 'lucide-react';

const AddAddressBottomModal = ({ isOpen, onClose, onSaveAddress }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    type: 'Home', // Home, Work, Other
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim() || !formData.city.trim()) {
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      name: formData.name.trim(),
      phone: formData.phone.trim() || '+91 9876543210',
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim() || 'State',
      zip: formData.zip.trim(),
      type: formData.type,
    };

    onSaveAddress(newAddr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn p-0 sm:p-4">
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden transform transition-transform animate-slideUp">
        
        {/* Handle Bar for Bottom Sheet Mobile */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Address</h3>
              <p className="text-[11px] text-slate-400">Enter delivery details for shipment</p>
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Address Tag Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Address Type Tag</label>
            <div className="flex gap-3">
              {[
                { label: 'Home', icon: Home },
                { label: 'Work', icon: Briefcase },
                { label: 'Other', icon: Tag },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = formData.type === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: item.label }))}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Recipient Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Adarsh Kumar"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Mobile Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. +91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          {/* House / Flat / Street */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Flat, House No., Building, Street Address *</label>
            <textarea
              name="address"
              required
              rows="2"
              placeholder="e.g. Flat 402, Block B, Green Heights Apartment, Outer Ring Road"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">City *</label>
              <input
                type="text"
                name="city"
                required
                placeholder="Bengaluru"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">State</label>
              <input
                type="text"
                name="state"
                placeholder="Karnataka"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Pincode / ZIP *</label>
              <input
                type="text"
                name="zip"
                required
                placeholder="560103"
                value={formData.zip}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 dark:shadow-none transition-all cursor-pointer"
            >
              <Check className="h-4 w-4" /> Save & Deliver Here
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddAddressBottomModal;
