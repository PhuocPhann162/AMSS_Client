import { type GetRef } from 'antd/es/_util/type';
import Rate, { type RateProps } from 'antd/es/rate';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ARateProps extends RateProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ARateRef extends GetRef<typeof Rate> {}

export const ARate = forwardRef<ARateRef, ARateProps>(
  ({ allowHalf = true, ...props }, ref) => (
    <Rate ref={ref} allowHalf={allowHalf} {...props} />
  ),
);
ARate.displayName = 'ARate';
