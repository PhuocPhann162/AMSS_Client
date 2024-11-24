import { Tooltip, TooltipProps } from 'antd';
import { TooltipRef } from 'antd/es/tooltip';
import { forwardRef, Ref } from 'react';

type ATooltipProps = TooltipProps;

const ATooltip = forwardRef<TooltipRef, ATooltipProps>((props, ref: Ref<TooltipRef>) => (
  <Tooltip {...props} ref={ref} />
));

ATooltip.displayName = 'ATooltip';
export { ATooltip };
