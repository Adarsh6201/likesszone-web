'use client';

import { Suspense } from 'react';
import SchemeManager from '../../../views/admin/SchemeManager';

export default function AdminSchemesPage() {
  return (<Suspense fallback={null}><SchemeManager /></Suspense>);
}
