import { DIRECTION_Y, useScrollDirection } from '@/hooks';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeaderHomeProps {
  children?: ReactNode;
  rootClassName?: string;
}

export const HomeHeader = ({ children, rootClassName }: HeaderHomeProps) => {
  const { directionY } = useScrollDirection();

  return (
    <header
      className={twMerge(
        directionY === DIRECTION_Y.down && '-translate-y-full',
        'mx-auto w-fit rounded-b-3xl bg-black1/50 text-white1 duration-500 ease-out [backdrop-filter:saturate(180%)_blur(20px)]',
        rootClassName,
      )}
    >
      {children}
    </header>
  );
};
