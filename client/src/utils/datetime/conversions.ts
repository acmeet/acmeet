/**
 * converts local time datetime to the Date for UTC midnight of the datetime's month/day/year
 * @param date local time date
 * @returns UTC date for the year/month/day-of-month, at midnight
 */
export const asUtcDate = (date: Date) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}