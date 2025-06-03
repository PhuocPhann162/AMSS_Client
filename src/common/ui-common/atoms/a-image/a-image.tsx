import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'antd/es/image';

export type AImageProps = ImageProps;

export const AImage = (props: AImageProps) => (
  <Image
    {...props}
    preview={
      typeof props.preview === 'boolean'
        ? props.preview
        : { destroyOnClose: true, ...props.preview }
    }
    className={cn('object-cover [&.ant-image-img]:h-full', props.className)}
  />
);
