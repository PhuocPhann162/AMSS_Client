import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AHomeCardProps = CardProps;

export type AHomeCardRef = GetRef<typeof Card>;

export const AHomeCard = forwardRef<AHomeCardRef, AHomeCardProps>(
  (props, ref) => (
    <Card
      ref={ref}
      {...props}
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
AHomeCard.displayName = 'AHomeCard';
