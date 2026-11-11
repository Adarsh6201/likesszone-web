'use client';

import { Suspense } from 'react';
import ProductManager from '../../../views/admin/ProductManager';

export default function AdminProductsPage() {
  return (<Suspense fallback={null}><ProductManager /></Suspense>);
}
