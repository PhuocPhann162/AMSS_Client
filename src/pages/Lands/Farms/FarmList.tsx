import ListTable from '~/common/ListTable';
import { Breadcrumb } from '~/components/UI';

export const FarmList = () => {
  return (
    <div>
      <Breadcrumb pageParent='Land' pageName='All Farms' />
      <ListTable />
    </div>
  );
};
