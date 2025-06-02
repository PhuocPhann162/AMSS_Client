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
        'mx-auto w-fit rounded-b-3xl bg-[#353535]/50 text-white duration-500 ease-out [backdrop-filter:saturate(180%)_blur(80px)]',
        rootClassName,
      )}
    >
      {children}
    </header>
  );
};
