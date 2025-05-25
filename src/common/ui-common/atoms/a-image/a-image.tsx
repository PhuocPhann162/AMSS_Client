import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'antd/es/image';

export type AImageProps = ImageProps;

export const AImage = (props: AImageProps) => (
  <Image {...props} className={cn('object-cover', props.className)} />
);
