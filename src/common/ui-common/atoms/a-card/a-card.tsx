import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';

export type ACardProps = CardProps;

export type ACardRef = GetRef<typeof Card>;

export const ACard = forwardRef<ACardRef, ACardProps>((props, ref) => (
  <Card
    ref={ref}
    {...props}
    className={cn('bg-white shadow-lg', props.className)}
  />
));
ACard.displayName = 'ACard';
