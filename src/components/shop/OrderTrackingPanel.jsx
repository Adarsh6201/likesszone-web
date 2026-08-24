import React from 'react';
import { Calendar, ShieldCheck, MapPin, Truck, Check, Package, Clock, Download } from 'lucide-react';
import { generateAndDownloadInvoice } from '../../utils/invoiceGenerator';

const OrderTrackingPanel = ({ order }) => {
  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const trackingSteps = [
    { label: 'Ordered', desc: 'Order placed & confirmed' },
    { label: 'Processing', desc: 'Packed & ready to dispatch' },
    { label: 'Shipped', desc: 'In transit with courier' },
    { label: 'Delivered', desc: 'Delivered to recipient' }
  ];

  const currentStepIndex = getStatusStep(order.status);

  // Helper to generate tracking logs based on status
  const getTrackingLogs = (ord) => {
    const logs = [];
    const dateObj = new Date(ord.date);
    
    logs.push({
      title: 'Order Confirmed',
      desc: 'We have received your payment and registered your checkout request.',
      time: new Date(dateObj.getTime()).toLocaleString('en-IN', { timeZone: 'IST' }),
      done: true
    });

    if (getStatusStep(ord.status) >= 1) {
      logs.push({
        title: 'Prepared & Packed',
        desc: 'Package packed at Likesszon sorting warehouse and handed over to logistics partner.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 4).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    }
    
    if (getStatusStep(ord.status) >= 2) {
      logs.push({
        title: 'In Transit',
        desc: 'Package departed local sorting hub and is in transit to destination hub.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 18).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    }

    if (getStatusStep(ord.status) >= 3) {
      logs.push({
        title: 'Delivered',
        desc: 'Package successfully delivered and handed over to customer.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 42).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    } else {
      if (ord.status === 'Pending') {
        logs.push({ title: 'Awaiting Packing', desc: 'Preparing shipment logs at sorting center.', done: false });
      } else if (ord.status === 'Processing') {
        logs.push({ title: 'Awaiting Dispatch', desc: 'Handing parcel over to carrier transit team.', done: false });
      } else if (ord.status === 'Shipped') {
        logs.push({ title: 'Out For Delivery', desc: 'Package reaching near-destination hub for final delivery.', done: false });
      }
    }

    return logs.reverse(); // Newest logs first
  };

  const logs = getTrackingLogs(order);

  return (
    <div className="space-y-6">
      
      {/* Order Basic Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{order.id}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <span>Ordered on: {new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
            </div>

            <button
              type="button"
              onClick={() => generateAndDownloadInvoice(order)}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/50 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Download Tax Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400">Total Invoice</p>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">₹{(order.total || 0).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-slate-400">Payment Status</p>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              {order.paymentStatus || 'Paid'}
            </span>
          </div>
          <div className="col-span-2">
            <p className="text-slate-400 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-indigo-500" /> Shipping Destination</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
              {order.shippingDetails?.address || 'No Address'}, {order.shippingDetails?.city || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Order Tracking Progress Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            Order Tracking Progress
          </h3>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/50">
            {order.status || 'Processing'}
          </span>
        </div>

        {/* Clean, Modern Progress Timeline */}
        <div className="relative max-w-2xl mx-auto px-4 py-4">
          
          {/* Progress Line Track (Centered on 40px Node Circles: top-5 = 20px) */}
          <div className="absolute left-10 right-10 top-9 -translate-y-1/2 h-1.5 z-0">
            {/* Track Background */}
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            {/* Active Progress Fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStepIndex / (trackingSteps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Tracking Step Node Circles & Labels */}
          <div className="relative flex justify-between items-start z-10">
            {trackingSteps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={idx} className="flex flex-col items-center space-y-2.5 w-20 sm:w-28 text-center">
                  
                  {/* Node Circle */}
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-bold text-xs ${
                    isCompleted
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                  } ${isCurrent ? 'ring-4 ring-indigo-500/20 scale-110' : ''}`}>
                    {isCompleted ? (
                      <Check className="h-5 w-5 stroke-[2.5]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Label & Snippet */}
                  <div>
                    <p className={`text-xs font-bold leading-tight ${
                      isCurrent 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : isCompleted 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-400'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 hidden sm:block mt-1 line-clamp-1">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Checkpoint Timeline Logs Details */}
        <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-500" />
            Tracking Activity Logs
          </h4>
          
          <div className="relative pl-6 ml-3 space-y-6 pt-2">
            {logs.map((log, index) => (
              <div key={index} className="relative">
                
                {/* Vertical Connector Line */}
                {index < logs.length - 1 && (
                  <div className={`absolute left-[-21px] top-3.5 bottom-[-24px] w-[2px] z-0 ${
                    log.done ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
                  }`}></div>
                )}

                {/* Dot Indicator */}
                <div className={`absolute -left-[25px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white dark:bg-slate-900 z-10 flex items-center justify-center ${
                  log.done ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {log.done && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/60 shadow-2xs">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h5 className={`text-xs font-bold ${log.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {log.title}
                    </h5>
                    {log.time && (
                      <span className="text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                        {log.time}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {log.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default OrderTrackingPanel;
