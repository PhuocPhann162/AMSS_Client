import { forwardRef, type ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ARawImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const ARawImage = forwardRef<HTMLImageElement, ARawImageProps>(
  (props, ref) => {
    return (
      <img
        ref={ref}
        title={props.alt}
        {...props}
        className={twMerge('h-full w-full object-cover', props.className)}
      />
    );
  },
);
ARawImage.displayName = 'ARawImage';
