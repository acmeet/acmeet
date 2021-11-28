import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import SlotsGrid from './slots-grid';

import { c } from '@/utils/cls';

import styles from './.module.scss';

import type { DayOfWeekIndex } from '@/utils/datetime/date';
import { AvailabilityGrid, View } from '../types';
import { useRespondersLabel } from './hooks/useRespondersLabel';
import { Availability } from '../hooks/useSanitizedMeetData';

interface AvailabilitiesProps {
  view: View;
  dates: Date[];
  hours: number[];
  aggregateAvailabilitiesGrid: number[][];
  availabilityGrids: AvailabilityGrid[];
  localAvailabilityGrid: (0|1)[][];
  setLocalAvailabilityGrid: Dispatch<SetStateAction<(0|1)[][]>>;
  setLocalNumTimesAvailable: Dispatch<SetStateAction<number>>;
  availabilities: Availability[];
  selectedResponders: Set<number>;
  toggleSelectedResponder: Dispatch<number>;
}

const Availabilities: React.FC<AvailabilitiesProps> = ({
  view,
  dates,
  hours,
  aggregateAvailabilitiesGrid,
  availabilityGrids,
  localAvailabilityGrid,
  setLocalAvailabilityGrid,
  setLocalNumTimesAvailable,
  availabilities,
  selectedResponders,
  toggleSelectedResponder,
}) => {

  const [dowStart, setDowStart] = useState<DayOfWeekIndex>(0);

  // for updating list of responders when hovering/selecting slots in "view" view
  const [selectedSlot, setSelectedSlot] = useState<[number, number] | undefined>();
  const [hoveredSlot, setHoveredSlot] = useState<[number, number] | undefined>();

  // whether to style a responder's name as "unavailable"
  const isUnavailable = (i: number) => {
    if (hoveredSlot !== undefined) {
      return availabilityGrids[i][hoveredSlot[0]][hoveredSlot[1]] == 0;
    }
    if (selectedSlot !== undefined) {
      return availabilityGrids[i][selectedSlot[0]][selectedSlot[1]] == 0;
    }
    return false;
  }

  const selectedAvailabilityGrids = useMemo(() => (
    availabilityGrids.filter((_, i) => selectedResponders.has(i))
  ), [selectedResponders, availabilityGrids]);

  const respondersLabel = useRespondersLabel({
    view,
    availabilities,
    availabilityGrids,
    selectedResponders,
    selectedAvailabilityGrids,
    selectedSlot,
    hoveredSlot,
  });

  const selectedRespondersNameAndIndex = useMemo(() => availabilities.reduce<[string, number][]>((accum, { name }, i) => {
    if (selectedResponders.has(i)) { accum.push([name, i]); }
    return accum;
  }, []), [selectedResponders, availabilities]);

  return (
    <div className={styles.availabilities}>
      <div className={styles['calendar-container']}>
        <div className={styles.calendar}>
          <div className={c(styles['calendar-times'], styles.col)}>
            <div className={styles['col-header']}>Local time</div>
            {hours.map((hour, i) => (
              <div className={styles.hour} key={i}>
                {formatHour(hour)}
              </div>
            ))}
          </div>
          <SlotsGrid
            view={view}
            dowStart={dowStart}
            dates={dates}
            hours={hours}
            aggregateAvailabilitiesGrid={aggregateAvailabilitiesGrid}
            availabilityGrids={availabilityGrids}
            localAvailabilityGrid={localAvailabilityGrid}
            setLocalAvailabilityGrid={setLocalAvailabilityGrid}
            setLocalNumTimesAvailable={setLocalNumTimesAvailable}
            selectedAvailabilityGrids={selectedAvailabilityGrids}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            hoveredSlot={hoveredSlot}
            setHoveredSlot={setHoveredSlot}
          />
        </div>
      </div>
      <div className={styles.responders}>
        <div className={styles['responders-heading']}>
          <h3 className={styles['responders-header']}>{respondersLabel}</h3>
          {selectedResponders.size === 0 ? null : (
            <div className={styles['responders-selected']}>
              {selectedRespondersNameAndIndex.map(([name, i], j) => (
                <span
                  key={j}
                  className={styles['responder-selected']}
                  onClick={() => toggleSelectedResponder(i)}
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={styles['responders-list']}>
          {availabilities.map(({ name }, i) => (
            <span
              key={i}
              className={c(
                styles.responder,
                selectedResponders.has(i) && styles.selected,
                isUnavailable(i) && styles.unavailable,
              )}
              onClick={() => { toggleSelectedResponder(i); }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Availabilities;

const formatHour = (hour: number) => `${hour % 12 || 12} ${hour < 12 ? 'am' : 'pm'}`;