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
      className={twMerge(
        'pointer-events-none flex items-center justify-center',
        props.className,
      )}
    >
      <div
        className={twMerge(
          'rounded-[32px] border border-transparent bg-neutral-50/50 px-4 py-3 backdrop-blur-10 backdrop-saturate-180 transition-[transform,opacity,box-shadow,border] duration-500 ease-out [pointer-events:initial]',
          scrollPosition.scrollY > 0
            ? 'border-white/20 shadow-xl shadow-black/[0.08]'
            : '',
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
