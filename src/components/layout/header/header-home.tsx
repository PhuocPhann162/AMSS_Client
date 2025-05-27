import { DIRECTION_Y, useScrollDirection } from '@/hooks';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export interface HeaderHomeProps {
  children?: ReactNode;
  rootClassName?: string;
}

export const HeaderHome = ({ children, rootClassName }: HeaderHomeProps) => {
  const { directionY } = useScrollDirection();

  return (
    <header
      className={cn(
        directionY === DIRECTION_Y.down && '-translate-y-full',
        'mx-auto w-fit rounded-b-3xl bg-black/50 text-white duration-500 ease-out [backdrop-filter:saturate(180%)_blur(16px)]',
        rootClassName,
      )}
    >
      {children}
    </header>
  );
};
