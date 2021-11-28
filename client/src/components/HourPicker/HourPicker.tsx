import React, { ChangeEventHandler, useRef, useState } from 'react';

import { c } from '@/utils/cls';

import styles from './.module.scss';

import type { HourPickerChangeEventHandler } from './types';

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const ampm = ['am', 'pm'] as const;

const hoursOptions = hours.map((hour) => <option key={hour} value={hour}>{`${hour}:00`}</option>);
const ampmOptions = ampm.map((mode) => <option key={mode} value={mode}>{mode}</option>);

type TwelveHourType = typeof hours[number];
type AmpmType = typeof ampm[number];

interface HourPickerProps {
  onChange?: HourPickerChangeEventHandler;
  defaultHour?: TwelveHourType;
  defaultAmpm?: AmpmType;
  className?: string;
  hourClassName?: string;
  ampmClassName?: string;
}

const to24Hour = (hour: TwelveHourType, mode: AmpmType) => {
  return (hour % 12) + (mode === 'am' ? 0 : 12);
}

const HourPicker: React.FC<HourPickerProps> = ({
  onChange,
  defaultHour = 0,
  defaultAmpm = 'am',
  className,
  hourClassName,
  ampmClassName,
}) => {
  const initialHour = defaultHour + (defaultAmpm === 'am' ? 0 : 12);
  
  const hourRef = useRef<HTMLSelectElement>(null);
  const ampmRef = useRef<HTMLSelectElement>(null);

  const [hour, setHour] = useState<number>(initialHour);

  const getHour = () => {
    if (!hourRef.current || !ampmRef.current
      || (Number(hourRef.current.value) as TwelveHourType) === NaN
      || !(ampm.includes(ampmRef.current.value as AmpmType))
    ) {
      return initialHour;
    }
    return to24Hour(Number(hourRef.current.value) as TwelveHourType, ampmRef.current.value as AmpmType);
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newHour = getHour();
    if (onChange instanceof Function) { onChange?.(newHour, hour); }
    setHour(newHour);
  }

  return (
    <div className={c(styles['hour-picker'], className)}>
      <select
        ref={hourRef}
        className={c(styles['hour-picker__hour'], hourClassName)}
        onChange={handleChange}
        defaultValue={defaultHour}
      >
        {hoursOptions}
      </select>
      <select
        ref={ampmRef}
        className={c(styles['hour-picker__ampm'], ampmClassName)}
        onChange={handleChange}
        defaultValue={defaultAmpm}
      >
        {ampmOptions}
      </select>
    </div>
  );
};

export default HourPicker;