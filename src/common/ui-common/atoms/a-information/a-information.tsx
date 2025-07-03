import Descriptions, { type DescriptionsProps } from 'antd/es/descriptions';

type ADescriptionsProps = DescriptionsProps;

export const ADescriptions = ({
  colon = false,
  column = 1,
  ...props
}: ADescriptionsProps) => (
  <Descriptions
    column={column}
    colon={colon}
    {...props}
    styles={{
      ...props.styles,
      label: {
        width: 'calc(100%/3)',
        ...props.styles?.label,
      },
    }}
  />
);
