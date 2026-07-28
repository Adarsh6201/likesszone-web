import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { Package, ChevronRight } from 'lucide-react';
import OrderSearchSidebar from '../../components/shop/OrderSearchSidebar';
import OrderTrackingPanel from '../../components/shop/OrderTrackingPanel';
import OrderItemsInvoice from '../../components/shop/OrderItemsInvoice';

const MyOrders = () => {
  const { orders, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderIdQuery = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(orderIdQuery);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pre-select order if query param is set
  useEffect(() => {
    if (orderIdQuery) {
      const match = orders.find(
        (o) => o.id.toLowerCase() === orderIdQuery.trim().toLowerCase()
      );
      setSelectedOrder(match || null);
    } else {
      setSelectedOrder(null);
    }
  }, [orderIdQuery, orders]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setSearchParams({ id: searchId.trim() });
  };

  const handleSelectOrder = (id) => {
    setSearchId(id);
    setSearchParams({ id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 capitalize">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Track Orders</span>
      </nav>

      {/* Main Grid: Lookup search & Details tracking panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <OrderSearchSidebar 
          searchId={searchId}
          onSearchIdChange={setSearchId}
          onSearchSubmit={handleSearchSubmit}
          orders={orders}
          selectedOrderId={selectedOrder?.id}
          onSelectOrder={handleSelectOrder}
        />

        {/* Right Column: Tracking Progress Details */}
        <div className="lg:col-span-8">
          
          {selectedOrder ? (
            <div className="space-y-6">
              <OrderTrackingPanel 
                order={selectedOrder}
              />
              <OrderItemsInvoice 
                items={selectedOrder.items}
                products={products}
              />
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <Package className="h-12 w-12 text-slate-350 dark:text-slate-600 mb-4" />
              {orderIdQuery ? (
                <>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">No Order Found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">We couldn't locate any order with the ID "{orderIdQuery}". Please check the order code and search again.</p>
                </>
              ) : (
                <>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Select an Order</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">Click one of the recent test orders on the sidebar, or search your order ID directly to view real-time tracking progress logs.</p>
                </>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default MyOrders;
