import { MAX_DAYS_PER_MEET } from '@/common/constants';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Metadata from './metadata';
import Calendar from './calendar';
import Times from './times';

import { useCreateMeetMutation } from '@/graphql';
import { c } from '@/utils/cls';
import { validateMeetFields } from '@/utils/validation/meet';
import { getTimezones } from '@/utils/datetime/timezones';

import styles from './.module.scss';

const Home = () => {
  const [{ fetching }, createMeet] = useCreateMeetMutation();
  const router = useRouter();

  const timezones = useMemo(() => getTimezones(), []);
  const initialTimezone = useMemo(() => timezones[Intl.DateTimeFormat().resolvedOptions().timeZone], [timezones]);
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [dates, setDates] = useState<Date[]>([]);
  const onChangeSelectedDates = (state: Date[]) => { setDates(state); }
  const calendarLabel = useMemo(() => (!dates.length
    ? `Click on dates in the calendar to select them`
    : dates.length > MAX_DAYS_PER_MEET
      ? `Too many dates selected. Max ${MAX_DAYS_PER_MEET} allowed, but ${dates.length} selected`
      : dates.length === 1
        ? `${dates.length} date selected`
        : `${dates.length} dates selected`
  ), [dates]);

  const [startHour, setStartHour] = useState<number>(9);
  const [endHour, setEndHour] = useState<number>(17);
  const [timezone, setTimezone] = useState<string>(initialTimezone.name);

  const hours = useMemo(() => (
    [startHour, endHour < startHour ? endHour + 24 : endHour]
  ), [startHour, endHour]);

  const onClickCreateMeetButton = () => {
    if (fetching || !validateMeetFields({ name: title, description, dates, hours, timezone })) { return; }

    // convert dates to midnight of selected timezone
    const offset = timezones[timezone].minutesOffset - initialTimezone.minutesOffset;
    const adjustedDates = dates.map((date) => new Date(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()).setMinutes(-offset)
    ));
    // create entry in db
    createMeet({ title: title, description, dates: adjustedDates, hours }).then((res) => {
      const meetUrl = res.data?.createMeet.id;
      if (res.error || !meetUrl) { throw new Error('error creating meet'); }
      router.push(`/m/${meetUrl}`);
    });
  }

  const meetDatesLabelClassName = useMemo(() => c(
    styles['dates-selected'],
    dates.length > MAX_DAYS_PER_MEET && styles['dates-selected--exceeded']
  ), [dates]);

  return (
    <div className={styles['meet-creation']}>
      <Metadata
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <div className={styles['meet-config']}>
        <div className={meetDatesClassName}>
          <p className={meetDatesLabelClassName}>
            {calendarLabel}
          </p>
          <Calendar
            className={styles.calendar}
            onChangeSelectedDates={onChangeSelectedDates}
          />
        </div>
        <div className={styles['meet-config-col--right']}>
          <Times
            onChangeStartHour={(state) => { setStartHour(state); }}
            onChangeEndHour={(state) => { setEndHour(state); }}
            timezones={timezones}
            timezone={timezone}
            onChangeTimezone={(e) => setTimezone(e.target.value)}
          />
          <div className={styles['meet-submit']}>
            <Button
              type="submit"
              variant="outlined"
              className={styles['meet-submit__button']}
              onClick={onClickCreateMeetButton}
              disabled={!validateMeetFields({ name: title, description, dates, hours })}
            >
              Create meet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const meetDatesClassName = c(styles['meet-dates'], styles['meet-config-col--left']);