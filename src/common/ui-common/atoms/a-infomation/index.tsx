import { Descriptions, DescriptionsProps } from 'antd';

type ADescriptionsProps = DescriptionsProps;

const ADescriptions = (props: ADescriptionsProps) => (
  <Descriptions column={1} colon={false} labelStyle={{ width: 'calc(100%/3)' }} {...props} />
);
export { ADescriptions };
