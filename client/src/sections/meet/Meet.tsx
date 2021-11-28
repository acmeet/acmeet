import React, { useState } from 'react';

import Input from '@/components/Input';
import Panel from '@/components/Panel';
import Availabilities from './availabilities';
import AvailabilitiesHeader from './header';

import { useHours } from './hooks/useHours';
import { useGrids } from './hooks/useGrids';
import { useLocalData } from './hooks/useLocalData';
import { useMonthYearLabel } from './hooks/useMonthYearLabel';
import { useSelectedResponders } from './hooks/useSelectedResponders';

import styles from './.module.scss';

import type { View } from './types';
import type { SanitizedMeetData } from './hooks/useSanitizedMeetData';

interface MeetProps {
  data: SanitizedMeetData;
  meetId: string;
}

const Meet = ({
  data,
  meetId,
}: MeetProps) => {
  const {
    title,
    description,
    dates,
    startHour,
    endHour,
    scheduledTime,
    availabilities,
  } = data;

  const [view, setView] = useState<View>('view');

  // converts [startHour, endHour] to range of numbers corresponding to interval [startHour, endHour)
  const hours = useHours({ startHour, endHour });

  // converts list of times to grid
  const { aggregateAvailabilitiesGrid, availabilityGrids } = useGrids({ dates, hours, availabilities });

  // for filtering view of availabilities to subset of responders
  const { selectedResponders, toggleSelectedResponder } = useSelectedResponders();

  const {
    localName, setLocalName,
    localAvailabilityGrid, setLocalAvailabilityGrid,
    localNumTimesAvailable, setLocalNumTimesAvailable,
    submitLocalAvailability,
    localScheduledTime, setLocalScheduledTime,
    submitLocalScheduledTime,
  } = useLocalData({ meetId, dates, hours, setView });

  const monthYearLabel = useMonthYearLabel({ dates });

  return (
    <div className={styles.meet}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.container}>
        <AvailabilitiesHeader
          view={view}
          setView={setView}
          localName={localName}
          localNumTimesAvailable={localNumTimesAvailable}
          submitAvailability={submitLocalAvailability}
          submitScheduledTime={submitLocalScheduledTime}
        />
        <Panel className={styles['name-panel']} hidden={view !== 'add'}>
          <Input
            type="text"
            className={styles['name-input']}
            placeholder="Your name"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
        </Panel>
        <h3>{monthYearLabel}</h3>
        <Availabilities
          view={view}
          dates={dates}
          hours={hours}
          aggregateAvailabilitiesGrid={aggregateAvailabilitiesGrid}
          availabilityGrids={availabilityGrids}
          localAvailabilityGrid={localAvailabilityGrid}
          setLocalAvailabilityGrid={setLocalAvailabilityGrid}
          setLocalNumTimesAvailable={setLocalNumTimesAvailable}
          availabilities={availabilities}
          selectedResponders={selectedResponders}
          toggleSelectedResponder={toggleSelectedResponder}
        />
      </div>
    </div>
  );
};

export default Meet;