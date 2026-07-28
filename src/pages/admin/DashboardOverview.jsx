import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import StatsGrid from '../../components/admin/StatsGrid';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { products, orders } = useProducts();

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'Paid' ? sum + o.total : sum, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const totalProducts = products.length;

  return (
    <div className="space-y-8">
      <StatsGrid 
        totalRevenue={totalRevenue}
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        totalProducts={totalProducts}
      />
      <RecentTransactionsTable 
        orders={orders}
        onManageAll={() => navigate('/admin/orders')}
      />
    </div>
  );
};

export default DashboardOverview;
