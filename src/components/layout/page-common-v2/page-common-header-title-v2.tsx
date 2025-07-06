import type { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export type PageCommonHeaderTitleV2Props = ComponentProps<'a'>;

export const PageCommonHeaderTitleV2 = (
  props: PageCommonHeaderTitleV2Props,
) => {
  const location = useLocation();

  return (
    <a
      href={location.pathname}
      {...props}
      className={twMerge('text-xl font-bold', props.className)}
    />
  );
};
