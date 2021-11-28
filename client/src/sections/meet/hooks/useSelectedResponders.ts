import { Dispatch, useState } from 'react';

export const useSelectedResponders = () => {
  const [selectedResponders, setSelectedResponders] = useState<Set<number>>(new Set());
  const toggleSelectedResponder: Dispatch<number> = (i: number) => {
    setSelectedResponders((s) => {
      const newSet = new Set(s);
      if (newSet.has(i)) { newSet.delete(i); }
      else { newSet.add(i); }
      return newSet;
    })
  }
  
  return {
    selectedResponders,
    toggleSelectedResponder,
  };
}