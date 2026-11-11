'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import Policies from '../../views/shop/Policies';

export default function PoliciesPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <Policies />
    </StoreLayout>
  </Suspense>);
}
