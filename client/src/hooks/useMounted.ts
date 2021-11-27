import { useEffect, useState } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => { setMounted(false); }
   }, []);

  return mounted;
}