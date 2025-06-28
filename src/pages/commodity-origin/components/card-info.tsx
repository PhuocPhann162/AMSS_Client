import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardInfoProps = ComponentProps<'div'>;

export const CardInfo = (props: CardInfoProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'overflow-hidden rounded-xl border border-green-300/50 shadow-xl transition-shadow duration-500 ease-out hover:shadow-2xl',
        props.className,
      )}
    />
  );
};

export type CardInfoHeaderProps = ComponentProps<'div'>;

export const CardInfoHeader = (props: CardInfoHeaderProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center gap-2 bg-gradient-to-br from-green-600/80 via-green-500/80 to-green-400/80 p-4 text-white',
        props.className,
      )}
    />
  );
};

export type CardInfoIconProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

export const CardInfoIcon = ({ asChild, ...props }: CardInfoIconProps) => {
  const Comp = asChild ? Slot : 'div';

  return <Comp {...props} className={twMerge('h-5 w-5', props.className)} />;
};

export type CardInfoTitleProps = ComponentProps<'div'>;

export const CardInfoTitle = (props: CardInfoTitleProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'text-lg font-semibold tracking-tight',
        props.className,
      )}
    />
  );
};

export type CardInfoDescriptionProps = ComponentProps<'div'>;

export const CardInfoDescription = (props: CardInfoDescriptionProps) => {
  return (
    <div
      {...props}
      className={twMerge('text-sm font-medium opacity-90', props.className)}
    />
  );
};

export type CardInfoContentProps = ComponentProps<'div'>;

export const CardInfoContent = (props: CardInfoContentProps) => {
  return <div {...props} className={twMerge('p-6', props.className)} />;
};
