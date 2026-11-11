'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import About from '../../views/shop/About';

export default function AboutPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <About />
    </StoreLayout>
  </Suspense>);
}
