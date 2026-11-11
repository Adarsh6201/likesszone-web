'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import Checkout from '../../views/shop/Checkout';

export default function CheckoutPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <Checkout />
    </StoreLayout>
  </Suspense>);
}
