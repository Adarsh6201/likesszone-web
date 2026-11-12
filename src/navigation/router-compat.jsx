'use client';

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  useRouter,
  usePathname,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from 'next/navigation';

export function Link({ to, href, children, ...props }) {
  const target = to || href || '#';
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      if (to === -1) {
        router.back();
      } else if (to === 1) {
        router.forward();
      }
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useLocation() {
  const pathname = usePathname() || '/';
  const search = typeof window !== 'undefined' ? (window.location.search || '') : '';
  const hash = typeof window !== 'undefined' ? (window.location.hash || '') : '';

  return {
    pathname,
    search,
    hash,
    state: null,
  };
}

export function useParams() {
  const params = useNextParams();
  return params || {};
}

export function useSearchParams() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (nextInit) => {
    const params = new URLSearchParams(nextInit);
    router.push(`${pathname}?${params.toString()}`);
  };

  return [searchParams, setSearchParams];
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);

  return null;
}

export function Outlet({ children }) {
  return children || null;
}

export default {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Navigate,
  Outlet,
};

