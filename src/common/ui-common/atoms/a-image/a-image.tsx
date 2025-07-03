import { Image, type ImageProps } from 'antd';
import { twMerge } from 'tailwind-merge';

export type AImageProps = ImageProps;

export const AImage = (props: AImageProps) => (
  <Image
    {...props}
    preview={
      typeof props.preview === 'boolean'
        ? props.preview
        : { destroyOnHidden: true, ...props.preview }
    }
    className={twMerge('h-full object-cover', props.className)}
  />
);
