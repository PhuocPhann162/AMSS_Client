import {
  CARE_LOG_TYPE_LABEL,
  CareLogType,
} from '@/interfaces/care-log/care-log-type';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TypeTagProps extends ComponentProps<'span'> {
  type: CareLogType;
}

export const TypeTag = ({ type, ...props }: TypeTagProps) => {
  return (
    <span
      {...props}
      className={twMerge(
        'block w-fit rounded-full border border-gray-50/50 bg-gray-100 px-2 py-1 font-medium duration-500 ease-out',
        props.className,
      )}
    >
      {CARE_LOG_TYPE_LABEL[type]}
    </span>
  );
};
