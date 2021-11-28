import { SLOTS_PER_HOUR } from '@/common/constants';
import { useCreateAvailabilityMutation } from '@/graphql';
import { usePersistedState } from '@/hooks/usePersistedState';
import { addMinutes } from '@/utils/datetime/date';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import type { View } from '../types';

interface UseLocalDataProps {
  meetId: string;
  dates: Date[];
  hours: number[];
  setView: Dispatch<SetStateAction<View>>;
}

export const useLocalData = ({
  meetId,
  dates,
  hours,
  setView,
}: UseLocalDataProps) => {
  const numDates = dates.length, numHours = hours.length;

  const [{ fetching }, createAvailability] = useCreateAvailabilityMutation();

  const [localName, setLocalName] = usePersistedState<string>('availability_name', '');
  const [localAvailabilityGrid, setLocalAvailabilityGrid] = useState<(0|1)[][]>([...Array(numDates)].map(() => (
      Array<(0|1)>(numHours * SLOTS_PER_HOUR).fill(0)
    ))
  );
  const [localNumTimesAvailable, setLocalNumTimesAvailable] = useState(0); // how many timeslots are selected locally
  
  useEffect(() => {
    setLocalAvailabilityGrid([...Array(numDates)].map(() => (
      Array<(0|1)>(numHours * SLOTS_PER_HOUR).fill(0)
    )));
    setLocalNumTimesAvailable(0);
  }, [numDates, numHours, setLocalAvailabilityGrid]);

  const submitLocalAvailability = async () => {
    if (fetching) { return; }
    if (localName === "" || localNumTimesAvailable === 0) { return; } // should never happen but sanity check

    // convert local timeslots grid to list of available times 
    const times: Date[] = [];
    localAvailabilityGrid.forEach((col, i) => {
      const date = dates[i];
      col.forEach((isSelected, j) => {
        if (!isSelected) { return; }
        const resolvedDate = addMinutes(date, j * 60 / SLOTS_PER_HOUR);
        times.push(resolvedDate);
      });
    });

    // send mutation and await response. also get updated meet info (new availabilities, etc) (?)
    const res = await createAvailability({ meetId, name: localName, times });

    // reset local data upon confirmation of successful submission
    setLocalName('');
    setLocalAvailabilityGrid([...Array(numDates)].map(() => (
      Array<(0|1)>(numHours * SLOTS_PER_HOUR).fill(0)
    )));
    setView('view');
  }

  const [localScheduledTime, setLocalScheduledTime] = useState<[[number, number] | undefined, [number, number] | undefined]>([undefined, undefined]);

  const submitLocalScheduledTime = () => {
    // TODO

    setLocalScheduledTime([undefined, undefined]);
  }

  return {
    localName, setLocalName,
    localAvailabilityGrid, setLocalAvailabilityGrid,
    localNumTimesAvailable, setLocalNumTimesAvailable,
    submitLocalAvailability,
    localScheduledTime, setLocalScheduledTime,
    submitLocalScheduledTime,
    fetching,
  };
}