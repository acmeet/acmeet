import { useMemo } from 'react';
import type { Availability } from '../../hooks/useSanitizedMeetData';
import type { AvailabilityGrid, View } from '../../types';
import { countAvailability } from '../utils/count-availability';

interface UseRespondersLabelProps {
  view: View;
  availabilities: Availability[];
  availabilityGrids: AvailabilityGrid[];
  selectedResponders: Set<number>;
  selectedAvailabilityGrids: AvailabilityGrid[];
  selectedSlot: [number, number] | undefined;
  hoveredSlot: [number, number] | undefined;
}

export const useRespondersLabel = ({
  view,
  availabilities,
  availabilityGrids,
  selectedResponders,
  selectedAvailabilityGrids,
  selectedSlot,
  hoveredSlot,
}: UseRespondersLabelProps) => {

  const label = useMemo(() => {
    switch (view) {
      case 'view': {
        if (selectedResponders.size > 0 && selectedResponders.size < availabilities.length) { // subset
          if (hoveredSlot !== undefined) {
            const count = countAvailability(selectedAvailabilityGrids, ...hoveredSlot);
            return `Responders (${count}/${selectedResponders.size})`;
          } else if (selectedSlot !== undefined) {
            const count = countAvailability(selectedAvailabilityGrids, ...selectedSlot);
            return `Responders (${count}/${selectedResponders.size})`;
          }
          return `Responders (${selectedResponders.size} selected)`;
        } // all
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
    selectedResponders,
    selectedSlot,
    hoveredSlot,
    // this doesn't do anything but gets eslint (react-hooks/exhaustive-deps) to shut up
    selectedAvailabilityGrids,
  ]);

  return label;
}