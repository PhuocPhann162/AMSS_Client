import { cn } from '@/lib/utils';
import { type FC, type ReactNode } from 'react';

export interface LabelProps {
  required?: boolean;
  children: ReactNode;
  name?: string;
  classNames?: Partial<Record<'root', string>>;
  colon?: boolean;
}

export const Label: FC<LabelProps> = ({
  required,
  children,
  name,
  colon,
  classNames,
}) => {
  return (
    <label
      htmlFor={name}
      className={cn('text-sm font-medium', classNames?.root)}
    >
      {children}
      {required && <span className='text-red-500'>*</span>}
      {colon && <span>:</span>}
    </label>
  );
};
