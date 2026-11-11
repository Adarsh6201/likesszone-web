'use client';

import { Suspense } from 'react';
import InvoiceManager from '../../../views/admin/InvoiceManager';

export default function AdminInvoicesPage() {
  return (<Suspense fallback={null}><InvoiceManager /></Suspense>);
}
