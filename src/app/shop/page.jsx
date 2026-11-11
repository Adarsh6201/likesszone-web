'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import ProductList from '../../views/shop/ProductList';

export default function ShopPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <ProductList />
    </StoreLayout>
  </Suspense>);
}
