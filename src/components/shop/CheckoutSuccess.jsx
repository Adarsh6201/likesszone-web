import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const CheckoutSuccess = ({ placedOrderId, email, name, address, city, paymentMethod = 'card', onTrack, onGoHome, order = null }) => {
  const getMethodLabel = (m) => {
    if (m === 'upi') return 'UPI Payment';
    if (m === 'cod') return 'Cash on Delivery (COD)';
    return 'Credit/Debit Card';
  };

  const handleDownloadInvoice = () => {
    const dummyOrder = order || {
      id: placedOrderId,
      date: new Date().toISOString(),
      customerName: name,
      customerEmail: email,
      shippingDetails: { address, city },
      paymentMethod: getMethodLabel(paymentMethod),
      paymentStatus: 'PAID',
      total: 0,
      items: [],
    };
    generateAndDownloadInvoice(dummyOrder);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
      <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Order Confirmed!</h2>
        <p className="text-slate-500 text-sm">
          Thank you for shopping with Likesszon. We have sent a confirmation email to <span className="font-semibold text-slate-800 dark:text-slate-200">{email || 'user@example.com'}</span>.
        </p>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-left text-xs space-y-2 text-slate-500">
        <p><span className="font-semibold text-slate-700 dark:text-slate-350">Order ID:</span> <span className="font-bold text-slate-900 dark:text-white">{placedOrderId}</span></p>
        <p><span className="font-semibold text-slate-700 dark:text-slate-350">Shipping To:</span> {name}</p>
        <p><span className="font-semibold text-slate-700 dark:text-slate-350">Address:</span> {address}, {city}</p>
        <p><span className="font-semibold text-slate-700 dark:text-slate-350">Payment Method:</span> <span className="font-semibold text-slate-900 dark:text-white">{getMethodLabel(paymentMethod)}</span></p>
        <p><span className="font-semibold text-slate-700 dark:text-slate-350">Delivery Speed:</span> Standard Free Delivery (3-5 business days)</p>
      </div>

      <div className="space-y-3 pt-2">
        <button
          onClick={handleDownloadInvoice}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-sm font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="h-4 w-4" /> Download Official Tax Invoice
        </button>

        <button
          onClick={onTrack}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-sm font-semibold text-white shadow-md transition-transform active:scale-95 cursor-pointer"
        >
          Track Order & View Details
        </button>

        <button
          onClick={onGoHome}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
