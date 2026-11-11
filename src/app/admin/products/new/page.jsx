'use client';

import { Suspense } from 'react';
import AddProduct from '../../../../views/admin/AddProduct';

export default function AdminNewProductPage() {
  return (<Suspense fallback={null}><AddProduct /></Suspense>);
}
