import React from "react";
import { Calendar as BaseCalendar } from "@_--/react-calendar";

import { c } from "@/utils/cls";

import '@_--/react-calendar/dist/styles/index.css';
import '@_--/react-calendar/dist/styles/defaults/index.css';
import '@_--/react-calendar/dist/styles/defaults/layout.css';
import '@_--/react-calendar/dist/styles/defaults/hsl.css';
import '@_--/react-calendar/dist/styles/presets/square-tiles.css';
import styles from './.module.scss';

import type { CalendarProps } from "@_--/react-calendar/dist/components/calendar/types";

const Calendar = ({ className, ...props }: Partial<CalendarProps>) => {
  return (
    <BaseCalendar
      {...props}
      className={c(styles.calendar, className)}
      selectMode="multi"
      autoUpdateViewedMonth={true}
      disabledDates="past"
      highlightedDates="today"
    />
  );
}

export default Calendar;