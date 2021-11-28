import { useMemo } from 'react';

import { DayOfWeekIndex, isEqual, weekStart } from '@/utils/datetime/date';

interface UseLastDayOfWeekIndicesProps {
  dates: Date[];
  dowStart: DayOfWeekIndex;
}

export const useLastDayOfWeekIndices = ({
  dates,
  dowStart,
}: UseLastDayOfWeekIndicesProps) => {

  const lastDayOfWeekIndices = useMemo(() => {
    const indices = new Set<number>();
    let groupWs = undefined as unknown as Date;
    dates.forEach((date, i) => {
      const ws = weekStart(date, dowStart);
      if (groupWs === undefined) {
        groupWs = ws;
      } else if (i > 0 && !isEqual(groupWs, ws)) {
        indices.add(i - 1);
        groupWs = ws;
      }
    });
    return indices;
  }, [dates, dowStart]);

  return lastDayOfWeekIndices;
}