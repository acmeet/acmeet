import { MS_PER_SLOT, SLOTS_PER_HOUR } from '@/common/constants';
import { useMemo } from 'react';

import { lowerBound } from '@/utils/lowerBound';

import type { Availability } from './useSanitizedMeetData';
import type { AvailabilityGrid } from '../types';

interface UseGridsProps {
  dates: Date[];
  hours: number[];
  availabilities: Availability[];
}

export const useGrids = ({
  dates,
  hours,
  availabilities,
}: UseGridsProps) => {

  const availabilityGrids: AvailabilityGrid[] = useMemo(() => {
    return availabilities.map(({ timeslots }) => {
      const availabilityGrid = [...Array(dates.length)].map(() => (
        Array<0|1>(hours.length * SLOTS_PER_HOUR).fill(0)
      ));
      timeslots.forEach((timeslot) => {
        const i = lowerBound(dates, timeslot);
        const msDifference = timeslot.getTime() - dates[i].getTime();
        const j = Math.floor(msDifference / MS_PER_SLOT);
        availabilityGrid[i][j] = 1;
      });
      return availabilityGrid;
    })
  }, [dates, hours, availabilities]);

  const aggregateAvailabilitiesGrid = useMemo(() => {
    const tmp = [...Array(dates.length)].map(() => (
      Array<number>(hours.length * SLOTS_PER_HOUR).fill(0)
    ));

    availabilityGrids.forEach((availabilityGrid) => {
      availabilityGrid.forEach((vec, i) => {
        vec.forEach((c, j) => {
          tmp[i][j] += c;
        })
      })
    });

    return tmp;
  }, [availabilityGrids, dates.length, hours.length]);
  
  return { aggregateAvailabilitiesGrid, availabilityGrids } as const;
}