import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';

export interface ACardV2Props extends Omit<CardProps, 'variant'> {
  variant?: CardProps['variant'] | 'blur';
}

export type ACardV2Ref = GetRef<typeof Card>;

export const ACardV2 = forwardRef<ACardV2Ref, ACardV2Props>(
  ({ variant = 'blur', ...props }, ref) => (
    <Card
      ref={ref}
      variant={variant === 'blur' ? undefined : variant}
      {...props}
      rootClassName={cn(
        variant === 'blur' &&
          '[backdrop-filter:saturate(180%)_blur(8px)] bg-white/80 border-0',
        props.rootClassName,
      )}
      classNames={{
        ...props.classNames,
        body: cn(
          '[&.ant-card-body]:before:content-[initial] [&.ant-card-body]:after:content-[initial]',
          props.classNames?.body,
        ),
      }}
    />
  ),
);
ACardV2.displayName = 'ACard';
