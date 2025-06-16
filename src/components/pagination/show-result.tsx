import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ShowResultProps extends HTMLAttributes<HTMLParagraphElement> {
  from: number;
  to: number;
  total: number;
}

export const ShowResult = ({ from, to, total, ...props }: ShowResultProps) => {
  return (
    <p {...props} className={twMerge('[&_span]:font-medium', props.className)}>
      Show results <span>{from}</span> - <span>{to}</span> of{' '}
      <span>{total}</span>
    </p>
  );
};
