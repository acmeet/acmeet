import { ArgumentValidationError } from 'type-graphql';

import { UserInput } from './types';

import type { KeyOf, ValueOf } from '@/common/utils/types';

import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from '@/common/constants/validation';

export const validateUser = (fields: Partial<UserInput>) => {
  Object.entries(fields).forEach(([property, value]) => {
    if (!validateUserField(property as keyof UserInput, value)) {
      throw new ArgumentValidationError([{ property, value }]);
    }
  });
  return true;
};

const validateUserField = (field: KeyOf<UserInput>, value: ValueOf<UserInput>) => {
  switch (field) {
    case 'id':
      return typeof value === 'string';

    case 'name':
      return typeof value === 'string'
        && NAME_MIN_LENGTH <= value.length
        && value.length <= NAME_MAX_LENGTH;

    case 'email':
      return typeof value === 'string'
        && value.length <= EMAIL_MAX_LENGTH
        // TODO
      
    case 'password':
      return typeof value === 'string'
        && PASSWORD_MIN_LENGTH <= value.length
        && value.length <= PASSWORD_MAX_LENGTH;
    default:
      return false;
  }
}