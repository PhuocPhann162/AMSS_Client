import { DIRECTION_Y, useScrollDirection, useScrollPosition } from '@/hooks';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeaderHomeProps extends HTMLAttributes<HTMLElement> {
  classNames?: Partial<Record<'content', string>>;
}

export const HomeHeader = ({
  children,
  classNames,
  ...props
}: HeaderHomeProps) => {
  const scrollDirection = useScrollDirection();
  const scrollPosition = useScrollPosition();

  return (
    <header
      {...props}
      className={twMerge('flex items-center justify-center', props.className)}
    >
      <div
        className={twMerge(
          'rounded-[32px] border border-ebb-200/20 bg-ebb-50/80 px-4 py-3 backdrop-blur-20 backdrop-saturate-180 transition-[transform,opacity,box-shadow] duration-500 ease-out',
          scrollPosition.scrollY > 0 ? 'shadow-lg shadow-woodsmoke-200/20' : '',
          scrollDirection.directionY === DIRECTION_Y.down
            ? '-translate-y-full opacity-0'
            : '',
          classNames?.content,
        )}
      >
        {children}
      </div>
    </header>
  );
};
