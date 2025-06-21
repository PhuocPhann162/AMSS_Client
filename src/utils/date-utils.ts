import { format } from 'date-fns';

/**
 * Format date to yyyy/MM/dd HH:mm
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy HH:mm');
};
