import Descriptions, { type DescriptionsProps } from 'antd/es/descriptions';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ADescriptionsProps extends DescriptionsProps {}

export const ADescriptions: FC<ADescriptionsProps> = ({
  colon = false,
  column = 1,
  labelStyle = { width: 'calc(100%/3)' },
  ...props
}) => (
  <Descriptions
    column={column}
    colon={colon}
    labelStyle={labelStyle}
    {...props}
  />
);
