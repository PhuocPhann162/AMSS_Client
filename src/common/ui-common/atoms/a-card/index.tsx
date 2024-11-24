import { Card, CardProps } from 'antd';
import clsx from 'clsx';
import { FC } from 'react';

type ACardProps = CardProps;

const ACard: FC<ACardProps> = (props: ACardProps) => (
  <Card {...props} className={clsx('bg-white shadow-lg', props.className)} />
);
export { ACard };
