import Carousel, { type CarouselProps } from 'antd/es/carousel';
import { memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ACarouselProps extends CarouselProps {}

export const ACarousel = memo<ACarouselProps>(({ ...props }) => (
  <Carousel {...props} />
));
ACarousel.displayName = 'ACarousel';
