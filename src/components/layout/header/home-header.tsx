import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeaderHomeProps {
  children?: ReactNode;
  rootClassName?: string;
}

export const HomeHeader = ({ children, rootClassName }: HeaderHomeProps) => {
  return (
    <header
      className={twMerge(
        'text-white mix-blend-difference duration-500 ease-out',
        rootClassName,
      )}
    >
      {children}
    </header>
  );
};
