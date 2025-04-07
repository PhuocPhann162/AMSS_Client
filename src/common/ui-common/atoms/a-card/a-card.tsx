import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ACardProps extends CardProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ACardRef extends GetRef<typeof Card> {}

export const ACard = forwardRef<ACardRef, ACardProps>(
  ({ className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn('bg-white shadow-lg', className)}
      {...props}
    />
  ),
);
ACard.displayName = 'ACard';
