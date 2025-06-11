import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type TitleContentSectionProps = HTMLAttributes<HTMLElement> & {
  headerTitle: string;
  classNames?: Partial<Record<'headerTitle' | 'content', string>>;
};

export const TitleContentSection = ({
  headerTitle,
  classNames,
  children,
  ...props
}: TitleContentSectionProps) => {
  return (
    <section
      {...props}
      className={twMerge('flex flex-col gap-3', props.className)}
    >
      <h1 className={twMerge('text-2xl font-bold', classNames?.headerTitle)}>
        {headerTitle}
      </h1>
      <div
        className={twMerge(
          'flex flex-col gap-3 rounded-lg p-4',
          classNames?.content,
        )}
      >
        {children}
      </div>
    </section>
  );
};
