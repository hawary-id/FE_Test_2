'use client';
import { useAppContext } from '@/context/useAppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useProtectedRoute() {
  const { token } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/signin');
    }
  }, [token, router]);

  return token;
}

export default useProtectedRoute;
