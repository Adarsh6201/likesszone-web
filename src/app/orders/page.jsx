'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import MyOrders from '../../views/shop/MyOrders';

export default function OrdersPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <MyOrders />
    </StoreLayout>
  </Suspense>);
}
