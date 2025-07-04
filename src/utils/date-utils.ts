import { format } from 'date-fns';

/**
 * Format date to MM/dd/yyyy HH:mm
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MM/dd/yyyy HH:mm');
};

export const formatISODate = (
  date: Date | string,
  formatStr?: string,
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr || 'MM/dd/yyyy HH:mm:ss');
};
