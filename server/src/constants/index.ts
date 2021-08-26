export const MAX_DAYS_PER_MEET = 14;
export const SLOTS_PER_HOUR = 2;

export const DATE_AGNOSTIC_MEET_DATES = [...Array(7).keys()].map((i) => new Date(Date.UTC(2006, 0, i+1)));
