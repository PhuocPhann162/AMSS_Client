import Image, { type ImageProps } from 'antd/es/image';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AImageProps extends ImageProps {}

export const AImage: FC<AImageProps> = ({ ...props }) => <Image {...props} />;
