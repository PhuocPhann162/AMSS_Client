import { useEffect, useState } from 'react';
import { useGetAllFarmsQuery } from '~/api/farmApi';
import { Pagination } from '~/common';
import ListTable from '~/common/ListTable';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { pageOptions, userModel } from '~/interfaces';

export const FarmList = () => {
  const [userList, setUserList] = useState<userModel[]>([]);
  const [filters, setFilters] = useState({
    searchString: ''
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: ''
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  const { data, isLoading } = useGetAllFarmsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString
    });
  };

  useEffect(() => {
    if (data) {
      setUserList(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  return (
    <div>
      {isLoading && <MainLoader />}
      <Breadcrumb pageParent='Land' pageName='All Farms' />
      <ListTable farmList={data?.apiResponse.result} />
      <Pagination
        currentPageSize={currentPageSize}
        setCurrentPageSize={setCurrentPageSize}
        pageOptions={pageOptions}
        setPageOptions={setPageOptions}
        totalRecords={totalRecords}
      />
    </div>
  );
};
