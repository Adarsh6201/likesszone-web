'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminCategoriesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/product-types');
  }, [router]);

  return null;
}
