import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export type ContainerIgnoreHeaderProps = HTMLAttributes<HTMLDivElement>;

export const ContainerIgnoreHeader = (props: ContainerIgnoreHeaderProps) => {
  return (
    <div
      {...props}
      className={cn('mt-[--navbar-height] p-6', props.className)}
    />
  );
};
