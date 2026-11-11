'use client';

import { Suspense } from 'react';
import Register from '../../views/auth/Register';

export default function RegisterPage() {
  return (<Suspense fallback={null}><Register /></Suspense>);
}
