import Tabs, { type TabsProps } from 'antd/es/tabs';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ATabsProps extends TabsProps {}

export const ATabs: FC<ATabsProps> = ({ ...props }) => {
  return <Tabs {...props} />;
};
ATabs.displayName = 'ATabs';
