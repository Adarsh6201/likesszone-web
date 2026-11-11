'use client';

import { Suspense } from 'react';
import ProductTypeManager from '../../../views/admin/ProductTypeManager';

export default function AdminProductTypesPage() {
  return (<Suspense fallback={null}><ProductTypeManager /></Suspense>);
}
