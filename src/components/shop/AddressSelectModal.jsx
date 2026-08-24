import React from 'react';
import { X, MapPin, Plus, Check, Home, Briefcase, Tag, Trash2 } from 'lucide-react';

const AddressSelectModal = ({
  isOpen,
  onClose,
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onOpenAddModal,
  onDeleteAddress,
}) => {
  if (!isOpen) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Home': return Home;
      case 'Work': return Briefcase;
      default: return Tag;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn p-4">
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Select Shipping Address</h3>
              <p className="text-[11px] text-slate-400">Choose from your saved delivery locations ({addresses.length})</p>
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

        {/* Addresses List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {addresses.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <MapPin className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="text-xs font-semibold">No saved addresses found</p>
            </div>
          ) : (
            addresses.map((addr) => {
              const isSelected = addr.id === selectedAddressId;
              const Icon = getTypeIcon(addr.type);

              return (
                <div
                  key={addr.id}
                  onClick={() => {
                    onSelectAddress(addr);
                    onClose();
                  }}
                  className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Selection Radio Circle */}
                  <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}>
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>

                  {/* Address Content */}
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {addr.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <Icon className="h-2.5 w-2.5" />
                        {addr.type || 'Home'}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                          Selected
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {addr.address}, {addr.city}, {addr.state} - <span className="font-semibold">{addr.zip}</span>
                    </p>

                    <p className="text-[11px] text-slate-400">
                      Phone: <span className="font-semibold text-slate-700 dark:text-slate-300">{addr.phone}</span>
                    </p>
                  </div>

                  {/* Delete button (if not sole address) */}
                  {addresses.length > 1 && onDeleteAddress && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAddress(addr.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete Address"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAddModal();
            }}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New Address
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddressSelectModal;
