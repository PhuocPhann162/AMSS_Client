import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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
      rootClassName={twMerge(
        variant === 'blur'
          ? '[backdrop-filter:saturate(180%)_blur(80px)] bg-black1/30 text-white1 border-0'
          : '',
        props.rootClassName,
      )}
      classNames={{
        ...props.classNames,
        body: twMerge(
          '[&.ant-card-body]:before:content-[initial] [&.ant-card-body]:after:content-[initial]',
          props.classNames?.body,
        ),
      }}
    />
  ),
);
ACardV2.displayName = 'ACard';
