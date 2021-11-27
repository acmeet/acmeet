import {
  MEET_DATES_MAX_AMOUNT,
  MEET_DATES_MIN_AMOUNT,
  MEET_DESCRIPTION_MAX_LENGTH,
  MEET_TITLE_MAX_LENGTH,
  MEET_TITLE_MIN_LENGTH,
} from "@/common/constants/validation";

import type { KeyOf, ValueOf } from "@/common/utils/types";
import { timezones } from "@/utils/datetime/timezones";

interface ValidateMeetFieldsProps {
  name?: string;
  description?: string,
  dates?: Date[];
  hours?: number[];
  timezone?: string;
}

export const validateMeetFields = (fields: ValidateMeetFieldsProps) => {
  for (const k in fields) {
    if (!validateMeetField(k as KeyOf<typeof fields>, fields[k as KeyOf<typeof fields>])) {
      return false;
    }
  }
  return true;
}

const validateMeetField = (field: KeyOf<ValidateMeetFieldsProps>, value: ValueOf<ValidateMeetFieldsProps>) => {
  switch (field) {
    case 'name':
      return typeof value === 'string'
        && MEET_TITLE_MIN_LENGTH <= value.length
        && value.length <= MEET_TITLE_MAX_LENGTH
      ;
    case 'description':
      return typeof value === 'string'
        && value.length <= MEET_DESCRIPTION_MAX_LENGTH
      ;
    case 'dates':
      return Array.isArray(value)
        && MEET_DATES_MIN_AMOUNT <= value.length
        && value.length <= MEET_DATES_MAX_AMOUNT
        && (value as Date[]).every((d) => d instanceof Date)
      ;
    case 'hours':
      return Array.isArray(value)
        && value.length === 2
        && Number.isInteger(value[0]) && Number.isInteger(value[1])
        && 0 <= value[0] && value[0] < 24
        && value[0] < value[1] && value[1] <= (value[0] as number) + 24
      ;
    case 'timezone':
      return typeof value === 'string'
        && value in timezones
      ;
  }
}