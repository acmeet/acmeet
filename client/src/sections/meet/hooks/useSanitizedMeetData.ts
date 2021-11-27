import type { MeetQuery } from '@/graphql';
import { addHours } from '@/utils/datetime/date';
import { useMemo } from 'react';

interface UseSanitizedMeetDataProps {
  data: MeetQuery | undefined;
}

export interface Availability {
  name: string;
  timeslots: Date[];
}

export interface SanitizedMeetData {
  title: string; // default: `loading...`
  description: string; // default: ``
  dates: Date[]; // default: []. deserializes each date to Date and adds `startHour` hours to it.
  startHour: number; // default: 0
  endHour: number; // default: 0
  scheduledTime: Date[] | undefined; // default: undefined.
  availabilities: Availability[]; // default: []
}

export const useSanitizedMeetData = ({
  data,
}: UseSanitizedMeetDataProps): SanitizedMeetData => {
  const {
    title = 'loading...',
    description: _description,
    dates: _dates,
    hours = [0, 0],
    scheduledTime: _scheduledTime,
    availabilities: _availabilities,
  } = data?.meet ?? {};

  const description = _description ?? '';

  const [startHour, endHour] = hours;

  const dates = useMemo(() => (
    _dates?.sort()?.map((datestring) => addHours(new Date(datestring), startHour)) ?? []
  ), [_dates, startHour]);

  const scheduledTime = _scheduledTime?.map((datestring) => new Date(datestring)) ?? undefined;

  const availabilities = _availabilities?.map(({ timeslots, name }) => ({
    timeslots: timeslots?.map((datestring) => new Date(datestring)) ?? [],
    name,
  })) ?? [] as Availability[];

  return {
    title,
    description,
    dates,
    startHour,
    endHour,
    scheduledTime,
    availabilities,
  };
}