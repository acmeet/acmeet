import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const useRedirect = (to: string, condition = true, deps?: React.DependencyList) => {
  const router = useRouter();
  useEffect(() => {
    if (condition) {
      router.push(to);
    }
  }, deps);
}
