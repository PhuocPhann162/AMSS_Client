import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type PageCommonV2Props = ComponentProps<'div'>;

export const PageCommonV2 = (props: PageCommonV2Props) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex min-h-full flex-col bg-neutral-50',
        props.className,
      )}
    />
  );
};
