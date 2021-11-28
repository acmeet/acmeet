import React from 'react';

import { arrayShallowEquals } from '@/utils/arrayShallowEquals';
import { c } from '@/utils/cls';
import { SLOTS_PER_HOUR } from '@/common/constants';

import { countAvailability } from '../utils/count-availability';
import { formatDay, formatDow } from '../utils/fmt';
import { useLastDayOfWeekIndices } from '../hooks/useLastDayOfWeekIndices';
import { useSlotEvents } from '../hooks/useSlotEvents';

import styles from './.module.scss';

import type { DayOfWeekIndex } from '@/utils/datetime/date';
import type { SetValue } from '@/utils/types';
import type { AvailabilityGrid, View } from '../../types';

interface SlotsGridProps {
  view: View;
  dowStart: DayOfWeekIndex;
  dates: Date[];
  hours: number[];
  aggregateAvailabilitiesGrid: number[][];
  availabilityGrids: AvailabilityGrid[];
  localAvailabilityGrid: AvailabilityGrid;
  setLocalAvailabilityGrid: SetValue<AvailabilityGrid>;
  setLocalNumTimesAvailable: SetValue<number>;
  selectedAvailabilityGrids: AvailabilityGrid[];
  selectedSlot: [number, number] | undefined;
  setSelectedSlot: SetValue<[number, number] | undefined>;
  hoveredSlot: [number, number] | undefined;
  setHoveredSlot: SetValue<[number, number] | undefined>;
}

const SlotsGrid: React.FC<SlotsGridProps> = ({
  view,
  dowStart,
  dates,
  hours,
  aggregateAvailabilitiesGrid,
  availabilityGrids,
  localAvailabilityGrid, setLocalAvailabilityGrid,
  setLocalNumTimesAvailable,
  selectedAvailabilityGrids,
  selectedSlot, setSelectedSlot,
  hoveredSlot, setHoveredSlot,
}) => {

  const lastDayOfWeekIndices = useLastDayOfWeekIndices({ dates, dowStart });
  
  const {
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = useSlotEvents({
    view,
    localAvailabilityGrid,
    setLocalAvailabilityGrid,
    setLocalNumTimesAvailable,
    setSelectedSlot,
    setHoveredSlot,
  });

  // compute the opacity of a given slot
  const opacity = (i: number, j: number) => {
    switch (view) {
      case 'add': {
        return localAvailabilityGrid[i][j];
      }
      case 'view': {
        return selectedAvailabilityGrids.length > 0 && selectedAvailabilityGrids.length < availabilityGrids.length
          ? countAvailability(selectedAvailabilityGrids, i, j) / selectedAvailabilityGrids.length
          : aggregateAvailabilitiesGrid[i][j] / availabilityGrids.length
        ;
      }
      default: return 0;
    }
  }

  // outline selected or hovered slots
  const isOutlined = (i: number, j: number) => {
    const a = [i, j];
    switch (view) {
      case 'view': return arrayShallowEquals(a, hoveredSlot) || arrayShallowEquals(a, selectedSlot);
      default: return false;
    }
  }

  return (
    <div className={styles['grid-container']}>
      <div className={c(styles.grid, styles[`grid--${view}`])}>
        {dates.map((date, i) => (
          <div
            key={i}
            className={c(styles.col, lastDayOfWeekIndices.has(i) && styles['last-day-of-week'])}
          >
            <div className={styles['col-header']}>
              <span className={styles['col-header-dow']}>{formatDow(date)}</span>  
              <span className={styles['col-header-day']}>{formatDay(date)}</span>
            </div>
            {hours.map((_, j) => (
              <div className={styles.hour} key={j}>
                {slotsMap.map((_, k) => {
                  const row = j * SLOTS_PER_HOUR + k;
                  return (
                    <div
                      key={k}
                      className={c(
                        styles.slot,
                        isOutlined(i, row) && styles.outlined,
                      )}
                      style={{backgroundColor: `hsl(127deg 72% 42% / ${opacity(i, row)})` }}
                      onMouseDown={onMouseDown(i, row)}
                      onMouseUp={onMouseUp(i, row)}
                      onMouseEnter={onMouseEnter(i, row)}
                      onMouseLeave={onMouseLeave(i, row)}
                      onClick={onClick(i, row)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

export default SlotsGrid;

const slotsMap = Array(SLOTS_PER_HOUR).fill(undefined);