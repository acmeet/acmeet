import { useMemo } from 'react';

interface UseHoursProps {
  startHour: number;
  endHour: number;
}

export const useHours = ({
  startHour,
  endHour,
}: UseHoursProps) => {
  return useMemo(() => Array.from(
    { length: endHour - startHour},
    (_, i) => i + startHour
  ), [startHour, endHour]);
}