import { Dispatch, useMemo, useState } from 'react';

import SlotsGrid from './slots-grid';

import { c } from '@/utils/cls';

import { formatHour } from './utils/fmt';
import { useRespondersLabel } from './hooks/useRespondersLabel';

import styles from './.module.scss';

import type { DayOfWeekIndex } from '@/utils/datetime/date';
import type { SetValue } from '@/utils/types';
import type { Availability } from '../hooks/useSanitizedMeetData';
import type { AvailabilityGrid, View } from '../types';

interface AvailabilitiesProps {
  view: View;
  dates: Date[];
  hours: number[];
  aggregateAvailabilitiesGrid: number[][];
  availabilityGrids: AvailabilityGrid[];
  localAvailabilityGrid: (0|1)[][];
  setLocalAvailabilityGrid: SetValue<(0|1)[][]>;
  setLocalNumTimesAvailable: SetValue<number>;
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
  localAvailabilityGrid, setLocalAvailabilityGrid,
  setLocalNumTimesAvailable,
  availabilities,
  selectedResponders,
  toggleSelectedResponder,
}) => {
  // for configuring which day is the "start of the week"; atm always 0 (sunday)
  // may want to move this to its own context and share between create meet page and this one
  // and factor that into the calendar display
  const [dowStart, setDowStart] = useState<DayOfWeekIndex>(0);

  // for updating list of responders when hovering/selecting slots in "view" view
  const [selectedSlot, setSelectedSlot] = useState<[number, number] | undefined>();
  const [hoveredSlot, setHoveredSlot] = useState<[number, number] | undefined>();

  // whether to style a responder's name as "unavailable"
  const isUnavailable = (i: number) => {
    if (hoveredSlot !== undefined) {
      return availabilityGrids[i][hoveredSlot[0]][hoveredSlot[1]] === 0;
    }
    if (selectedSlot !== undefined) {
      return availabilityGrids[i][selectedSlot[0]][selectedSlot[1]] === 0;
    }
    return false;
  }

  // filtered availability grids by those which are selected
  const selectedAvailabilityGrids = useMemo(() => (
    availabilityGrids.filter((_, i) => selectedResponders.has(i))
  ), [selectedResponders, availabilityGrids]);

  // label for responders list
  const respondersLabel = useRespondersLabel({
    view,
    availabilities,
    availabilityGrids,
    selectedResponders,
    selectedAvailabilityGrids,
    selectedSlot,
    hoveredSlot,
  });

  // for creating select responders pills
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