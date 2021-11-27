import { ArgumentValidationError } from 'type-graphql';

import { isUuid } from '@/utils/validation/isUuid';

import { MeetInput } from './types';

import type { KeyOf, ValueOf } from '@/common/utils/types';

import {
  MEET_TITLE_MIN_LENGTH,
  MEET_TITLE_MAX_LENGTH,
  MEET_DESCRIPTION_MAX_LENGTH,
  MEET_DATES_MAX_AMOUNT,
} from '@/common/constants/validation';


export const validateMeet = (fields: Partial<MeetInput>) => {
  Object.entries(fields).forEach(([property, value]) => {
    if (!validateMeetField(property as KeyOf<MeetInput>, value)) {
      throw new ArgumentValidationError([{ property, value }]);
    }
  });
  return true;
};

const validateMeetField = (field: KeyOf<MeetInput>, value: ValueOf<MeetInput>) => {
  switch (field) {
    case 'id':
      return isUuid(value);
      
    case 'title':
      return typeof value === 'string'
        && MEET_TITLE_MIN_LENGTH <= value.length
        && value.length <= MEET_TITLE_MAX_LENGTH;

    case 'description':
      return typeof value === 'string'
        && value.length <= MEET_DESCRIPTION_MAX_LENGTH;

    case 'dates':
      return Array.isArray(value)
        && value.length >= 1
        && value.length <= MEET_DATES_MAX_AMOUNT;
        // graphql validates each element serializes to ISO8601

    case 'isDateAgnostic':
      return typeof value === 'boolean';

    case 'hours':
      return Array.isArray(value)
        && value.length === 2
        && Number.isInteger(value[0]) && Number.isInteger(value[1])
        && 0 <= value[0] && value[0] < 24
        && value[0] < value[1] && value[1] <= (value[0] as number) + 24;

    case'scheduledTime':
      return Array.isArray(value)
        && value.length === 2
        && value[0] < value[1];
        // graphql validates each element serialize to ISO8601
        // iso string comparison breaks on negative year but fuk that

    default:
      return false;
  }
}