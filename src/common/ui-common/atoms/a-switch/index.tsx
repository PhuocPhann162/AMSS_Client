import { Switch, SwitchProps } from 'antd';
import { forwardRef, Ref } from 'react';

type ASwitchProps = SwitchProps;

const ASwitch = forwardRef<HTMLButtonElement, ASwitchProps>((props, ref: Ref<HTMLButtonElement>) => (
  <Switch {...props} ref={ref} />
));

ASwitch.displayName = 'ASwitch';

export { ASwitch };
