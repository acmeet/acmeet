import type { UseQueryResponse } from "urql";
import type { MeetQuery } from "@/graphql";
import React, { useMemo, useState } from "react";
import Availabilities from "./availabilities";
import styles from './.module.scss';
import AvailabilitiesHeader from './header';
import type { View } from "./types";
import type { SanitizedMeetData } from "./hooks/useSanitizedMeetData";
import { useLocalData } from "./hooks/useLocalData";
import { useMonthYearLabel } from "./availabilities/hooks/useMonthYearLabel";
import { useHours } from "./hooks/useHours";
import Input from "@/components/Input";
import Panel from "@/components/Panel";
import { useGrids } from "./hooks/useGrids";

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

  // converts [startHour, endHour] to range of numbers corresponding
  const hours = useHours({ startHour, endHour });

  // converts list of times to grid
  const { aggregateAvailabilitiesGrid, availabilityGrids } = useGrids({ dates, hours, availabilities });

  // for filtering view of availabilities to a given responder
  const [selectedAvailabilityIndex, setSelectedAvailabilityIndex] = useState<number | undefined>();

  const {
    localName, setLocalName,
    localAvailabilityGrid, setLocalAvailabilityGrid,
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
          submitScheduledTime={submitLocalScheduledTime}
          submitAvailability={submitLocalAvailability}
          localName={localName}
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
          availabilities={availabilities}
          selectedAvailabilityIndex={selectedAvailabilityIndex}
          setSelectedAvailabilityIndex={setSelectedAvailabilityIndex}
        />
      </div>
    </div>
  );
};

export default Meet;