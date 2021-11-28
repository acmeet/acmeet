export const formatDow = (date: Date, locale='en-US') => date.toLocaleString(locale, { weekday: 'short' });
export const formatDay = (date: Date, locale='en-US') => date.toLocaleString(locale, { day: 'numeric' });
export const formatHour = (hour: number) => `${hour % 12 || 12} ${hour < 12 ? 'am' : 'pm'}`;
