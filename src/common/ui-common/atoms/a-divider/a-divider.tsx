import { cn } from '@/lib/utils';
import type { DividerProps } from 'antd/es/divider';
import Divider from 'antd/es/divider';

export type ADividerProps = DividerProps;

export const ADivider = (props: ADividerProps) => {
  return (
    <Divider
      {...props}
      rootClassName={cn('my-[initial]', props.rootClassName)}
    />
  );
};
