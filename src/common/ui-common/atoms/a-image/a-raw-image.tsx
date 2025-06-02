import type { ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ARawImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const ARawImage = (props: ARawImageProps) => {
  return (
    <img
      {...props}
      className={twMerge('w-full object-cover', props.className)}
    />
  );
};
