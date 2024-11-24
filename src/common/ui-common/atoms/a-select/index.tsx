import { Select, SelectProps } from 'antd';
import { forwardRef, Ref } from 'react';

type ASelectProps = SelectProps;

const ASelect = forwardRef<any, ASelectProps>((props, ref: Ref<any>) => <Select {...props} ref={ref} />);

ASelect.displayName = 'ASelect';
export { ASelect };
