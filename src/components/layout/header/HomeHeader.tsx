import { useScrollDirection, useScrollPosition } from '@/hooks';
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
          'rounded-3xl border border-woodsmoke-400/50 bg-woodsmoke-500/50 px-4 py-3 text-white backdrop-blur-60 backdrop-saturate-180 transition-[transform,opacity,box-shadow] duration-500 ease-out',
          scrollPosition.scrollY > 0 ? 'shadow-xl' : '',
          scrollDirection.directionY === 'down'
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
