import Dropdown, { type DropdownProps } from 'antd/es/dropdown';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ADropdownProps extends DropdownProps {}

export const ADropdown: FC<ADropdownProps> = ({ ...props }) => {
  return <Dropdown {...props} />;
};
ADropdown.displayName = 'ADropdown';
