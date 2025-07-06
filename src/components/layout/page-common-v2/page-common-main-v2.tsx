import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type PageCommonMainV2Props = ComponentProps<'main'>;

export const PageCommonMainV2 = (props: PageCommonMainV2Props) => {
  return <main {...props} className={twMerge('grow p-4', props.className)} />;
};
