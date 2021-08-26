import { ArgumentValidationError } from 'type-graphql';

import { KeyOf, ValueOf } from '../../utils/types';
import { AvailabilityInput } from './types';

import { isUuid } from '../../utils/validation/isUuid';

import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  AVAILABILIY_TIMES_MAX_AMOUNT,
} from '../../constants/validation';

export const validateAvailability = (fields: Partial<AvailabilityInput>) => {
  Object.entries(fields).forEach(([property, value]) => {
    if (!validateAvailabilityField(property as keyof AvailabilityInput, value)) {
      throw new ArgumentValidationError([{ property, value }]);
    }
  });
  return true;
};

const validateAvailabilityField = (field: KeyOf<AvailabilityInput>, value: ValueOf<AvailabilityInput>) => {
  switch (field) {
    case 'id':
      return isUuid(value);

    case 'meetId':
      return isUuid(value);

    case 'name':
      return typeof value === 'string'
        && NAME_MIN_LENGTH <= value.length
        && value.length <= NAME_MAX_LENGTH;

    case 'times':
      return Array.isArray(value)
        && value.length <= AVAILABILIY_TIMES_MAX_AMOUNT
        // graphql should validate each element serializes to ISO8601
    default:
      return false;
  }
}