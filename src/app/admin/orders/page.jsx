'use client';

import { Suspense } from 'react';
import OrderManager from '../../../views/admin/OrderManager';

export default function AdminOrdersPage() {
  return (<Suspense fallback={null}><OrderManager /></Suspense>);
}
