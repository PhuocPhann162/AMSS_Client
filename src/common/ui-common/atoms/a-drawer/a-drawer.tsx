import type { DrawerProps } from 'antd/es/drawer';
import Drawer from 'antd/es/drawer';

export type ADrawerProps = DrawerProps;

export const ADrawer = (props: ADrawerProps) => <Drawer {...props} />;
ADrawer.displayName = 'ADrawer';
