'use client';

import { Suspense } from 'react';
import DashboardOverview from '../../views/admin/DashboardOverview';

export default function AdminDashboardPage() {
  return (<Suspense fallback={null}><DashboardOverview /></Suspense>);
}
