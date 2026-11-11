'use client';

import { Suspense } from 'react';
import StoreLayout from '../components/layout/StoreLayout';
import Home from '../views/shop/Home';

export default function HomePage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <Home />
    </StoreLayout>
  </Suspense>);
}
