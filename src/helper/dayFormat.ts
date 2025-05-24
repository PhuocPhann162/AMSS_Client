import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

type DateTimeType = string | number | dayjs.Dayjs | Date | null | undefined;
type DateType = string | number | Date;

// UTC Date

export const dayjsUTC = dayjs.utc;

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const YYYY__MM__DD = 'YYYY/MM/DD';

export const formatUTCToLongLocalDate = (
  dateTime: DateTimeType,
): string | number | Date => {
  if (!dateTime) return '';
  return dayjsUTC(dateTime).local().format('dddd, MMMM Do, YYYY - hh:mm A');
};

export const formatInputDateToUTCDate = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).format();

export const formatToUTCStartMonth = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).add(1, 'day').format('MM/YYYY');
export const formatToUTCMonth = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).format('MM/YYYY');

export const formatInputDateToISOString = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).toISOString();

export const formatLocalDate = (dateTime: DateTimeType): string => {
  if (!dateTime) return '';
  return dayjsUTC(dateTime).local().format('YYYY-MM-DD');
};

// -----

export const formatInputDate = (
  dateTime: DateTimeType,
): string | number | Date => dayjs(dateTime).format('YYYY/MM/DD');

export const formatInputMonth = (
  dateTime: DateTimeType,
): string | number | Date => {
  return dayjs(dateTime).format('YYYY/MM');
};

export const formatDate = (dateTime: DateTimeType): string | number | Date => {
  if (!dateTime) return 'N/A';
  return dayjs(dateTime).format('YYYY-MM-DD');
};
export const formatDateExport = (
  dateTime: DateTimeType,
): string | number | Date => dayjs(dateTime).format('YYYYMMDD');

export const formatDateTime = (
  dateTime: DateTimeType,
): string | number | Date => dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');

export const formatLocalDateTime = (
  dateTime: DateTimeType,
): string | number | Date =>
  dayjsUTC(dateTime).local().format('HH:mm DD/MM/YYYY');

export const getYear = (dateTime: DateType): string | number | Date =>
  new Date(dateTime).getFullYear();
export const getMonth = (dateTime: DateType): string | number | Date =>
  new Date(dateTime).getMonth();
export const getDate = (dateTime: DateType): string | number | Date =>
  new Date(dateTime).getDate();

export const formatDayOfWeek = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).local().format('ddd');

export const formatMonthOfWeek = (
  dateTime: DateTimeType,
): string | number | Date => {
  if (typeof dateTime === 'number' && dateTime >= 0 && dateTime <= 11) {
    const parseDateTime = dayjs().month(dateTime);
    return dayjsUTC(parseDateTime).local().format('MMM');
  }
  return dayjsUTC(dateTime).local().format('MMM');
};

export const formatToTimeStamp = (
  dateTime: DateTimeType,
): string | number | Date => {
  if (!dateTime) {
    return dayjs(dayjs()).valueOf();
  }
  return dayjs(dateTime).valueOf();
};

export const startDateOfMonth = (
  dateTime: DateTimeType,
): string | number | Date => {
  if (!dateTime) {
    return dayjs(dayjs()).startOf('month').toISOString();
  }
  return dayjs(dateTime).startOf('month').toISOString();
};

export const endDateOfMonth = (
  dateTime: DateTimeType,
): string | number | Date => {
  if (!dateTime) {
    return dayjs(dayjs()).endOf('month').toISOString();
  }
  return dayjs(dateTime).endOf('month').toISOString();
};

export const formatToUTCLocalMonth = (
  dateTime: DateTimeType,
): string | number | Date => dayjsUTC(dateTime).local().format('MM/YYYY');

export const displayDateTimeByLocale = (
  value?: string,
  displayTime?: boolean,
) => {
  if (displayTime) {
    return dayjsUTC(value).local().format('YYYY/MM/DD hh:mm:ss A');
  }

  return dayjsUTC(value).local().format(YYYY_MM_DD);
};
