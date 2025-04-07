import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Segmented, { type SegmentedProps } from 'antd/es/segmented';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ASegmentedProps extends SegmentedProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ASegmentedRef extends GetRef<typeof Segmented> {}

export const ASegmented = forwardRef<ASegmentedRef, ASegmentedProps>(
  ({ className, ...props }, ref) => {
    return (
      <Segmented
        ref={ref}
        className={cn(className, 'font-semibold')}
        block
        {...props}
      />
    );
  },
);
ASegmented.displayName = 'ASegmented';
