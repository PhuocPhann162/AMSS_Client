import { Segmented, SegmentedProps } from 'antd';
import clsx from 'clsx';
type ASegmentedProps = SegmentedProps;
export const ASegmented = (props: ASegmentedProps) => {
  return <Segmented block {...props} className={clsx(props.className, 'font-semibold')} />;
};
