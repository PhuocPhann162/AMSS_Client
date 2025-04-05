import Image, { type ImageProps } from 'antd/es/image';
import { memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AImageProps extends ImageProps {}

export const AImage = memo<AImageProps>(({ ...props }) => <Image {...props} />);
AImage.displayName = 'AImage';
