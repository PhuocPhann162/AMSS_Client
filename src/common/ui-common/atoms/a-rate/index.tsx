import Rate, { type RateProps } from 'antd/es/rate';
import { memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ARateProps extends RateProps {}

export const ARate = memo<ARateProps>(({ allowHalf = true, ...props }) => (
  <Rate allowHalf={allowHalf} {...props} />
));
ARate.displayName = 'ARate';
