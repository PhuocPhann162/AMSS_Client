import { useGetAllFarmsQuery } from '~/api/farmApi';
import ListTable from '~/common/ListTable';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';

export const FarmList = () => {
  const { data, isLoading } = useGetAllFarmsQuery('');

  return (
    <div>
      {isLoading && <MainLoader />}
      <Breadcrumb pageParent='Land' pageName='All Farms' />
      <ListTable farmList={data?.result} />
    </div>
  );
};
