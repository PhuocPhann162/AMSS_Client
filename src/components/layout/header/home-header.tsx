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
          'backdrop-blur-10 rounded-[32px] border border-ebb-200/20 bg-ebb-100/70 px-4 py-3 backdrop-saturate-180 transition-[transform,opacity,box-shadow] duration-500 ease-out [pointer-events:initial]',
          scrollPosition.scrollY > 0 ? 'shadow-lg' : '',
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
