import { type GetRef } from 'antd/es/_util/type';
import Switch, { type SwitchProps } from 'antd/es/switch';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASwitchProps extends SwitchProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASwitchRef extends GetRef<typeof Switch> {}

export const ASwitch = forwardRef<ASwitchRef, ASwitchProps>((props, ref) => (
  <Switch ref={ref} {...props} />
));
ASwitch.displayName = 'ASwitch';
