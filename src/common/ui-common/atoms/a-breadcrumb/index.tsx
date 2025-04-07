import Breadcrumb, { type BreadcrumbProps } from 'antd/es/breadcrumb';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ABreadcrumbProps extends BreadcrumbProps {}

export const ABreadcrumb: FC<ABreadcrumbProps> = (props: ABreadcrumbProps) => (
  <Breadcrumb {...props} />
);
