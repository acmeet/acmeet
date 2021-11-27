import { getTimeZones as _getTimeZones } from '@vvo/tzdb';

export const asUtcOffset = (offset: number) => {
  const sign = Math.sign(offset);
  offset = Math.abs(offset);
  const hours = Math.floor(offset / 60);
  const minutes = offset % 60;
  const signStr = sign < 0 ? '-' : '+';
  return `${signStr}${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(2, '0')}`;
}

export const getTimezones = () => Object.fromEntries(_getTimeZones().map(({
  name,
  abbreviation,
  currentTimeOffsetInMinutes,
}) => (
  [name, {
    name,
    abbreviation,
    minutesOffset: currentTimeOffsetInMinutes,
    utcOffset: asUtcOffset(currentTimeOffsetInMinutes),
  }]
)));

export type DetailedTimezoneList = ReturnType<typeof getTimezones>;

// export const getTimezones = () => {
//   return getTimeZones().map(({ name, abbreviation, currentTimeOffsetInMinutes }) => ({
//     name,
//     abbreviation,
//     minuteOffset: currentTimeOffsetInMinutes,
//     utcOffset: asUtcOffset(currentTimeOffsetInMinutes),
//   }));
// }