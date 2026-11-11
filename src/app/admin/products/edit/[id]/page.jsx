'use client';

import { Suspense } from 'react';
import EditProduct from '../../../../../views/admin/EditProduct';

export default function AdminEditProductPage() {
  return (<Suspense fallback={null}><EditProduct /></Suspense>);
}
