import Carousel, {
  type CarouselRef,
  type CarouselProps,
} from 'antd/es/carousel';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ACarouselProps extends CarouselProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ACarouselRef extends CarouselRef {}

export const ACarousel = forwardRef<ACarouselRef, ACarouselProps>(
  ({ ...props }, ref) => <Carousel ref={ref} {...props} />,
);
ACarousel.displayName = 'ACarousel';
