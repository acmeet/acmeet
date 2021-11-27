import React, { useMemo } from 'react';

interface UseMonthYearLabelProps {
  locale?: string;
  dates: Date[];
}

const serMonthYear = (date: Date, locale = 'en-US') => date.toLocaleString(locale, { month: 'short', year: 'numeric' });

export const useMonthYearLabel = ({
  locale = 'en-US',
  dates,
}: UseMonthYearLabelProps) => {
  
  return useMemo(() => {
    switch (dates.length) {
      case 0: // shouldnt ever happen but just in case
        return `Month Year`;
      case 1:
        return serMonthYear(dates[0]);
      default:
        const from = serMonthYear(dates[0], locale), to = serMonthYear(dates[dates.length - 1], locale);
        return from === to ? from : `${from} - ${to}`;
    }
  }, [dates, locale]);
}