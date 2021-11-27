import { MAX_DAYS_PER_MEET, SLOTS_PER_HOUR } from '..';
import { HOURS_PER_DAY } from '../date';

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 255;

export const EMAIL_MAX_LENGTH = 255;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 255;

export const MEET_TITLE_MIN_LENGTH = 1;
export const MEET_TITLE_MAX_LENGTH = 255;
export const MEET_DESCRIPTION_MAX_LENGTH = 400;
export const MEET_DATES_MIN_AMOUNT = 1;
export const MEET_DATES_MAX_AMOUNT = MAX_DAYS_PER_MEET;

export const AVAILABILIY_TIMES_MAX_AMOUNT = SLOTS_PER_HOUR * HOURS_PER_DAY * MEET_DATES_MAX_AMOUNT;
