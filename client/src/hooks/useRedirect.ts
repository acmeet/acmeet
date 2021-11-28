import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRedirect = (to: string, condition = true, deps: React.DependencyList = []) => {
  const router = useRouter();
  useEffect(() => {
    if (condition) {
      router.push(to);
    }
  }, [...deps, router, condition, to]);
}
