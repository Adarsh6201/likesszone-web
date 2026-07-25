import React from 'react';
import { Calendar, ShieldCheck, MapPin, Truck, CheckCircle2 } from 'lucide-react';

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
    { label: 'Ordered', desc: 'Order received and confirmed' },
    { label: 'Processing', desc: 'Package prepared and packed' },
    { label: 'Shipped', desc: 'In transit with logistics carrier' },
    { label: 'Delivered', desc: 'Handed over to customer' }
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
        desc: 'Package packed at Likesszon sorting warehouse and handed over to Bluedart logistics.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 4).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    }
    
    if (getStatusStep(ord.status) >= 2) {
      logs.push({
        title: 'In Transit',
        desc: 'Package departed local sorting hub and is in transit PAN India to destination hub.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 18).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    }

    if (getStatusStep(ord.status) >= 3) {
      logs.push({
        title: 'Delivered',
        desc: 'Package successfully delivered and signed by customer.',
        time: new Date(dateObj.getTime() + 60 * 60 * 1000 * 42).toLocaleString('en-IN', { timeZone: 'IST' }),
        done: true
      });
    } else {
      if (ord.status === 'Pending') {
        logs.push({ title: 'Awaiting Packing', desc: 'Next: Preparing shipment logs at sorting center.', done: false });
      } else if (ord.status === 'Processing') {
        logs.push({ title: 'Awaiting Dispatch', desc: 'Next: Handing parcel over to carrier transit team.', done: false });
      } else if (ord.status === 'Shipped') {
        logs.push({ title: 'Out For Delivery', desc: 'Next: Package reaching near-destination hub for final delivery.', done: false });
      }
    }

    return logs.reverse(); // Newest logs first
  };

  const logs = getTrackingLogs(order);

  return (
    <div className="space-y-6">
      
      {/* Order Basic Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Order</span>
            <h2 className="text-xl font-black text-slate-905 dark:text-white mt-0.5">{order.id}</h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>Ordered on: {new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400">Total Invoice</p>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">₹{order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-slate-400">Payment status</p>
            <span className="inline-flex items-center gap-1 text-emerald-650 dark:text-emerald-450 font-bold mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              {order.paymentStatus}
            </span>
          </div>
          <div className="col-span-2">
            <p className="text-slate-400 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-455" /> Shipping Destination</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
              {order.shippingDetails?.address || 'No Address'}, {order.shippingDetails?.city || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Order tracking steps progress bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-8">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Truck className="h-4.5 w-4.5 text-indigo-500" />
          Order Tracking Progress
        </h3>

        {/* Horizontal Progress Timeline */}
        <div className="relative flex justify-between items-center max-w-xl mx-auto py-4">
          {/* Inset Line Track Container */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 z-0">
            {/* Line Background */}
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            {/* Active Line Fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(currentStepIndex / (trackingSteps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Tracking Nodes */}
          {trackingSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isActive = idx === currentStepIndex;
            
            return (
              <div key={idx} className="relative flex flex-col items-center z-10 space-y-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  {isCompleted && idx < currentStepIndex ? (
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>
                <div className="text-center w-16 sm:w-20">
                  <p className={`text-[10px] sm:text-xs font-bold leading-tight ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' :
                    isCompleted ? 'text-slate-900 dark:text-white' :
                    'text-slate-400'
                  }`}>{step.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkpoint logs details */}
        <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tracking Logs Checkpoints</h4>
          
          <div className="relative pl-6 ml-3 space-y-6">
            {logs.map((log, index) => (
              <div key={index} className="relative">
                {/* Vertical line connecting to next item */}
                {index < logs.length - 1 && (
                  <div className={`absolute left-[-25px] top-4 bottom-[-24px] w-[2px] z-0 ${
                    log.done ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
                  }`}></div>
                )}

                {/* Dot indicator */}
                <div className={`absolute -left-[30px] top-1 h-3 w-3 rounded-full border-2 bg-white dark:bg-slate-900 z-10 ${
                  log.done ? 'border-indigo-600 bg-indigo-600' : 'border-slate-350 dark:border-slate-700'
                }`}></div>
                
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h5 className={`text-xs font-bold ${log.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {log.title}
                    </h5>
                    {log.time && (
                      <span className="text-[10px] text-slate-400">{log.time}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">
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
