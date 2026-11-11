'use client';

import { Suspense } from 'react';
import StoreLayout from '../../../components/layout/StoreLayout';
import ProductDetail from '../../../views/shop/ProductDetail';

export default function ProductDetailPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <ProductDetail />
    </StoreLayout>
  </Suspense>);
}
