import { Spin, SpinProps } from 'antd';
import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

type ASpinProps = SpinProps;

const ASpin: FC<ASpinProps> = (props: ASpinProps) => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} {...props} />
);
export { ASpin };
