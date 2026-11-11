'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import Cart from '../../views/shop/Cart';

export default function CartPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <Cart />
    </StoreLayout>
  </Suspense>);
}
