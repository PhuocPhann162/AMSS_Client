import Dropdown, { type DropdownProps } from 'antd/es/dropdown';

export type ADropdownProps = DropdownProps;

export const ADropdown = (props: ADropdownProps) => {
  return <Dropdown {...props} />;
};
ADropdown.displayName = 'ADropdown';
