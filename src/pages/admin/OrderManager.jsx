import React from 'react';
import { useProducts } from '../../context/ProductContext';
import OrdersTable from '../../components/admin/OrdersTable';

const OrderManager = () => {
  const { orders, updateOrder } = useProducts();

  const handleStatusChange = (id, newStatus) => {
    const orderToUpdate = orders.find(o => o.id === id);
    if (orderToUpdate) {
      updateOrder(id, { ...orderToUpdate, status: newStatus });
    }
  };

  const handlePaymentChange = (id, newPayStatus) => {
    const orderToUpdate = orders.find(o => o.id === id);
    if (orderToUpdate) {
      updateOrder(id, { ...orderToUpdate, paymentStatus: newPayStatus });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customer Orders</h2>
        <p className="text-xs text-slate-500">Monitor tracking details, payment cycles, and fulfill orders.</p>
      </div>

      <OrdersTable 
        orders={orders}
        onStatusChange={handleStatusChange}
        onPaymentChange={handlePaymentChange}
      />
    </div>
  );
};

export default OrderManager;
