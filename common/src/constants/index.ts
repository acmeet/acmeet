import { MS_PER_HOUR } from "./date";

export const MAX_DAYS_PER_MEET = 14;
export const SLOTS_PER_HOUR = 2;

export const MS_PER_SLOT = MS_PER_HOUR / SLOTS_PER_HOUR;

export const DATE_AGNOSTIC_MEET_DATES = Array(7).fill(undefined).map((_, i) => (
  new Date(Date.UTC(2006, 0, i+1))
));
