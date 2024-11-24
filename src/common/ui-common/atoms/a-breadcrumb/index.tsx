import { Breadcrumb, BreadcrumbProps } from 'antd';
import { FC } from 'react';

type ABreadcrumbProps = BreadcrumbProps;

const ABreadcrumb: FC<ABreadcrumbProps> = (props: ABreadcrumbProps) => <Breadcrumb {...props} />;
export { ABreadcrumb };
