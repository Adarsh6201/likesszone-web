import React from 'react';

const OrdersTable = ({ orders = [], onStatusChange, onPaymentChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-semibold">
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Customer Details</th>
            <th className="py-3 px-4">Items Ordered</th>
            <th className="py-3 px-4 text-right">Total Invoice</th>
            <th className="py-3 px-4 text-center">Fulfillment Status</th>
            <th className="py-3 px-4 text-center">Payment Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
              <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
              <td className="py-3.5 px-4">
                <div>
                  <p className="font-semibold text-slate-850 dark:text-white">{order.customerName}</p>
                  <p className="text-xs text-slate-400">{order.customerEmail}</p>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <div className="text-xs space-y-0.5 text-slate-650 dark:text-slate-400">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="truncate max-w-[180px]">
                      {item.name} <span className="font-bold">x{item.quantity}</span>
                    </p>
                  ))}
                </div>
              </td>
              <td className="py-3.5 px-4 text-right font-semibold text-slate-800 dark:text-slate-100">
                ₹{order.total.toFixed(2)}
              </td>
              <td className="py-3.5 px-4 text-center">
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 py-1 px-2 text-xs outline-none dark:border-slate-800 dark:bg-slate-800 font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-3.5 px-4 text-center">
                <select
                  value={order.paymentStatus}
                  onChange={(e) => onPaymentChange(order.id, e.target.value)}
                  className={`rounded-lg border py-1 px-2 text-xs outline-none font-semibold ${
                    order.paymentStatus === 'Paid'
                      ? 'border-emerald-250 bg-emerald-50/50 text-emerald-600 dark:border-emerald-950 dark:bg-emerald-950/20'
                      : 'border-red-200 bg-red-50/50 text-red-500 dark:border-red-950 dark:bg-red-950/20'
                  }`}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
