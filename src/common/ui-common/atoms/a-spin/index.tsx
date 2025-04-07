import Spin, { type SpinProps } from 'antd/es/spin';
import { type FC } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASpinProps extends SpinProps {}

export const ASpin: FC<ASpinProps> = ({
  indicator = <LoadingOutlined style={{ fontSize: 48 }} spin />,
  ...props
}) => <Spin indicator={indicator} {...props} />;
