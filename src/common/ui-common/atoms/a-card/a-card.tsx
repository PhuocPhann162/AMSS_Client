import { type GetRef } from 'antd/es/_util/type';
import Card, { type CardProps } from 'antd/es/card';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ACardProps = CardProps;

export type ACardRef = GetRef<typeof Card>;

export const ACard = forwardRef<ACardRef, ACardProps>((props, ref) => (
  <Card
    ref={ref}
    {...props}
    className={twMerge('bg-white shadow-lg', props.className)}
    classNames={{
      ...props.classNames,
      body: twMerge(
        '[&.ant-card-body]:before:content-[initial] [&.ant-card-body]:after:content-[initial]',
        props.classNames?.body,
      ),
    }}
  />
));
ACard.displayName = 'ACard';
