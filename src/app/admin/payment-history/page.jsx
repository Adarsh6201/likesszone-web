'use client';

import { Suspense } from 'react';
import PaymentHistoryManager from '../../../views/admin/PaymentHistoryManager';

export default function AdminPaymentHistoryPage() {
  return (<Suspense fallback={null}><PaymentHistoryManager /></Suspense>);
}
