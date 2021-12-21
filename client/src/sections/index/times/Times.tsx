import React, { ChangeEventHandler, useMemo } from 'react';

import HourPicker from '@/components/HourPicker';

import { useMounted } from '@/hooks/useMounted';

import styles from './.module.scss';

import type { HourPickerChangeEventHandler } from '@/components/HourPicker/types';
import type { DetailedTimezoneList } from '@/utils/datetime/timezones';

interface TimesProps {
  onChangeStartHour: HourPickerChangeEventHandler;
  onChangeEndHour: HourPickerChangeEventHandler;
  timezones: DetailedTimezoneList;
  timezone: string;
  onChangeTimezone: ChangeEventHandler<HTMLSelectElement>;
}

const Times = ({
  onChangeStartHour,
  onChangeEndHour,
  timezones,
  timezone,
  onChangeTimezone,
}: TimesProps) => {

  const mounted = useMounted();

  const timezoneOptions = useMemo(() => Object.values(timezones).map(({ name, abbreviation, utcOffset }) => (
    <option key={name} value={name}>{`${name} (${abbreviation}, UTC${utcOffset})`}</option>
  )), [timezones]);

  return (
    <div className={styles['meet-times']}>
      <div className={styles['start-end-hours']}>
        <div className={styles['start-hour']}>
          <p className={styles['start-hour__label']}>Start hour</p>
          <HourPicker
            className={styles['start-hour__picker']}
            defaultHour={9}
            defaultAmpm="am"
            onChange={onChangeStartHour}
          />
        </div>
        <div className={styles['end-hour']}>
          <p className={styles['end-hour__label']}>End hour</p>
          <HourPicker
            className={styles['end-hour__picker']}
            defaultHour={5}
            defaultAmpm="pm"
            onChange={onChangeEndHour}
          />
        </div>
      </div>
      <div className={styles['timezone']}>
        <p className={styles['timezone__label']}>Timezone offset</p>
        <select
          className={styles['timezone__picker']}
          value={timezone}
          onChange={onChangeTimezone}
        >
          {mounted ? timezoneOptions : null}
        </select>
      </div>
    </div>
  );
};

export default Times;