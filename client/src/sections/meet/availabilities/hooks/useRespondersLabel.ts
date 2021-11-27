import { useMemo } from 'react';
import type { Availability } from '../../hooks/useSanitizedMeetData';
import type { AvailabilityGrid, View } from '../../types';

interface UseRespondersLabelProps {
  view: View;
  availabilities: Availability[];
  availabilityGrids: AvailabilityGrid[];
  selectedAvailabilityIndex: number | undefined;
  selectedSlot: [number, number] | undefined;
  hoveredSlot: [number, number] | undefined;
}

export const useRespondersLabel = ({
  view,
  availabilities,
  availabilityGrids,
  selectedAvailabilityIndex,
  selectedSlot,
  hoveredSlot,
}: UseRespondersLabelProps) => {
  return useMemo(() => {
    switch (view) {
      case 'view': {
        if (selectedAvailabilityIndex !== undefined) {
          return `${availabilities[selectedAvailabilityIndex].name}'s Availability`;
        }
        if (hoveredSlot !== undefined) {
          const count = countAvailability(availabilityGrids, ...hoveredSlot);
          return `Responders (${count}/${availabilities.length})`;
        } else if (selectedSlot !== undefined) {
          const count = countAvailability(availabilityGrids, ...selectedSlot);
          return `Responders (${count}/${availabilities.length})`;
        }
        return `Responders (${availabilities.length})`;
      }
      default: return `Responders (${availabilities.length})`;
    }
  }, [
    view,
    availabilities,
    availabilityGrids,
    selectedAvailabilityIndex,
    selectedSlot,
    hoveredSlot,
  ]);
}

const countAvailability = (availabilityGrids: AvailabilityGrid[], i: number, j: number) => {
  return availabilityGrids.reduce((accum, cur) => accum + cur[i][j], 0);
}