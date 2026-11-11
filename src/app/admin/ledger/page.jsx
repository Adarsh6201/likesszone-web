'use client';

import { Suspense } from 'react';
import LedgerManager from '../../../views/admin/LedgerManager';

export default function AdminLedgerPage() {
  return (<Suspense fallback={null}><LedgerManager /></Suspense>);
}
