import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import OrdersTable from '../../components/admin/OrdersTable';
import { Search, Filter, RotateCcw, ShoppingBag, CreditCard, ArrowUpDown } from 'lucide-react';

const OrderManager = () => {
  const { orders, updateOrder } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all' || paymentFilter !== 'all' || sortBy !== 'newest';

  // Apply filtering and sorting
  const filteredOrders = orders.filter((o) => {
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || (
      o.id.toLowerCase().includes(query) ||
      (o.customerName || '').toLowerCase().includes(query) ||
      (o.customerEmail || '').toLowerCase().includes(query) ||
      (o.items || []).some(item => (item.name || '').toLowerCase().includes(query))
    );

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || (o.paymentStatus || 'Paid') === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  }).sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.date || 0) - new Date(b.date || 0);
    }
    if (sortBy === 'price-high') {
      return (b.total || 0) - (a.total || 0);
    }
    if (sortBy === 'price-low') {
      return (a.total || 0) - (b.total || 0);
    }
    return new Date(b.date || Date.now()) - new Date(a.date || Date.now());
  });

  return (
    <div className="bg-white dark:bg-slate-900 border-[1.5px] border-slate-300 dark:border-slate-700 rounded-3xl p-6 space-y-6 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)] dark:shadow-none">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Customer Orders</h2>
          <p className="text-xs text-slate-500 mt-0.5">Monitor tracking details, payment cycles, and fulfill orders.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            Showing <span className="text-indigo-600 dark:text-indigo-400 font-black">{filteredOrders.length}</span> of {orders.length} orders
          </span>
        </div>
      </div>

      {/* Control Toolbar: Search & Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Order ID, Name, Item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium"
          />
        </div>

        {/* Fulfillment Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-bold cursor-pointer"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-bold cursor-pointer"
          >
            <option value="all">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-bold cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="price-high">Sort: Amount (High to Low)</option>
            <option value="price-low">Sort: Amount (Low to High)</option>
          </select>
        </div>

      </div>

      {/* Clear Filters Button Banner if filters are active */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 px-4 py-2 rounded-2xl text-xs">
          <span className="font-semibold text-indigo-700 dark:text-indigo-300">
            Active filters applied
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Clear All Filters
          </button>
        </div>
      )}

      {/* Orders Cards Grid / Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <ShoppingBag className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No Matching Orders</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No customer orders matched your search query or active status filters. Try clearing your search parameters.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
            </button>
          )}
        </div>
      ) : (
        <OrdersTable
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
          onPaymentChange={handlePaymentChange}
        />
      )}

    </div>
  );
};

export default OrderManager;
