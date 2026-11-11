'use client';

import { Suspense } from 'react';
import StoreLayout from '../../components/layout/StoreLayout';
import Settings from '../../views/shop/Settings';

export default function SettingsPage() {
  return (<Suspense fallback={null}>
    <StoreLayout>
      <Settings />
    </StoreLayout>
  </Suspense>);
}
