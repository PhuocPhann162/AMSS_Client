import Tooltip, { type TooltipProps, type TooltipRef } from 'antd/es/tooltip';
import { forwardRef } from 'react';

export type ATooltipProps = TooltipProps;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ATooltipRef extends TooltipRef {}

export const ATooltip = forwardRef<ATooltipRef, ATooltipProps>((props, ref) => (
  <Tooltip ref={ref} {...props} />
));
ATooltip.displayName = 'ATooltip';
