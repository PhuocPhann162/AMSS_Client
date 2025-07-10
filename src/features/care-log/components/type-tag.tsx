import {
  CARE_LOG_TYPE_LABEL,
  CareLogType,
  CARE_LOG_TYPE,
} from '@/interfaces/care-log/care-log-type';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TypeTagProps extends ComponentProps<'span'> {
  type: CareLogType;
}

export const TypeTag = ({ type, className, ...props }: TypeTagProps) => {
  const CARE_LOG_TYPE_COLOR = {
    [CARE_LOG_TYPE.Sowing]: 'bg-green-100 border-green-200 text-green-700',
    [CARE_LOG_TYPE.Watering]: 'bg-blue-100 border-blue-200 text-blue-700',
    [CARE_LOG_TYPE.Fertilizing]:
      'bg-yellow-100 border-yellow-200 text-yellow-700',
    [CARE_LOG_TYPE.SprayingPesticides]:
      'bg-red-100 border-red-200 text-red-700',
    [CARE_LOG_TYPE.Pruning]: 'bg-purple-100 border-purple-200 text-purple-700',
    [CARE_LOG_TYPE.Harvesting]:
      'bg-orange-100 border-orange-200 text-orange-700',
    [CARE_LOG_TYPE.Other]: 'bg-gray-100 border-gray-200 text-gray-700',
  };

  return (
    <span
      tabIndex={0}
      aria-label={CARE_LOG_TYPE_LABEL[type]}
      {...props}
      className={twMerge(
        'block w-fit rounded-full border px-2 py-1 text-xs font-medium outline-none duration-300 focus:ring-2 focus:ring-offset-2',
        CARE_LOG_TYPE_COLOR[type],
        className,
      )}
    >
      {CARE_LOG_TYPE_LABEL[type]}
    </span>
  );
};
