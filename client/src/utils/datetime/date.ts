import { mod } from '@/utils/math/mod';
import { Enumerate } from '@/utils/types';

export type MonthIndex = Enumerate<12>;
export type DayOfWeekIndex = Enumerate<7>;

export const addMinutes = (date: Date, n: number) => {
  return new Date(new Date(date).setMinutes(date.getMinutes() + n));
}

export const addHours = (date: Date, n: number) => {
  return new Date(new Date(date).setHours(date.getHours() + n));
}

export const weekStart = (date: Date, dowStart: DayOfWeekIndex = 0) => {
  return new Date(new Date(date).setDate(date.getDate() - mod(date.getDay() - dowStart, 7)));
}

export const isEqual = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
  );
}