import { Spin, type SpinProps } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export type ASpinProps = SpinProps;

export const ASpin = ({
  indicator = <AiOutlineLoading3Quarters className='size-12' />,
  ...props
}: ASpinProps) => <Spin indicator={indicator} spinning {...props} />;
