import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type PageCommonHeaderV2Props = ComponentProps<'header'>;

export const PageCommonHeaderV2 = (props: PageCommonHeaderV2Props) => {
  return (
    <header
      {...props}
      className={twMerge('z-50 shrink-0 px-4 py-3', props.className)}
    />
  );
};
