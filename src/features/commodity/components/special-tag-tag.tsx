import { ATag, type ATagProps } from '@/common/ui-common';
import type { Commodity } from '@/interfaces';
import { twMerge } from 'tailwind-merge';

export interface SpecialTagTagProps extends ATagProps {
  value: NonNullable<Commodity['specialTag']>;
}

export const SpecialTagTag = ({ value, ...props }: SpecialTagTagProps) => {
  return (
    <ATag
      {...props}
      className={twMerge(
        'rounded-2xl px-2.5 py-0.5 uppercase',
        props.className,
      )}
    >
      {value}
    </ATag>
  );
};
