import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type SectionInfoProps = ComponentProps<'section'>;

export const SectionInfo = (props: SectionInfoProps) => {
  return (
    <section
      {...props}
      className={twMerge(
        'flex flex-col gap-8 px-4 py-12 md:px-8',
        props.className,
      )}
    />
  );
};

type SectionInfoHeaderProps = ComponentProps<'div'>;

export const SectionInfoHeader = (props: SectionInfoHeaderProps) => {
  return (
    <div
      {...props}
      className={twMerge('flex flex-col gap-2 text-center', props.className)}
    />
  );
};

type SectionInfoTitleProps = ComponentProps<'h2'>;

export const SectionInfoTitle = (props: SectionInfoTitleProps) => {
  return (
    <h2 {...props} className={twMerge('text-3xl font-bold', props.className)} />
  );
};

type SectionInfoDescriptionProps = ComponentProps<'p'>;

export const SectionInfoDescription = (props: SectionInfoDescriptionProps) => {
  return (
    <p
      {...props}
      className={twMerge('text-lg text-neutral-600', props.className)}
    />
  );
};
