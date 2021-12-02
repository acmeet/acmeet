import { useMemo } from 'react';

import { countAvailability } from '../utils/count-availability';

import type { AvailabilityGrid, View } from '../../types';
import type { Availability } from '../../hooks/useSanitizedMeetData';

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
        let grids: AvailabilityGrid[];
        let suffix = '';
        if (selectedResponders.size > 0 && selectedResponders.size < availabilities.length) { // subset
          grids = selectedAvailabilityGrids;
          suffix = ' selected';
        } else {
          grids = availabilityGrids;
        }
        if (hoveredSlot !== undefined) {
          const count = countAvailability(grids, ...hoveredSlot);
          return `Responders (${count}/${grids.length}${suffix})`;
        } else if (selectedSlot !== undefined) {
          const count = countAvailability(grids, ...selectedSlot);
          return `Responders (${count}/${grids.length}${suffix})`;
        }
        return `Responders (${grids.length}${suffix})`;
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