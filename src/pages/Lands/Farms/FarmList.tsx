import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllFarmsQuery } from '@/api';
import { Pagination } from '@/common';
import {
  CreateIcon,
  EditTableIcon,
  MarkerIcon,
  SearchIcon,
  SortIcon,
} from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';
import { inputHelper } from '@/helper';
import { farmModel, pageOptions } from '@/interfaces';
import { AButton } from '@/common/ui-common';
import { PageCommon } from '@/components/layout/page/page-common';

export const FarmList = () => {
  const navigate = useNavigate();
  // Start State
  const [farmList, setFarmList] = useState<farmModel[]>([]);

  const [filters, setFilters] = useState({
    searchString: '',
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  // End State

  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllFarmsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  useEffect(() => {
    if (data) {
      setFarmList(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  useEffect(() => {
    setApiFilters(filters);
  }, [debouncedFilter]);

  return (
    <PageCommon headerTitle='All Farms'>
      <div>
        {isLoading && <MainLoader />}
        {!isLoading && (
          <>
            <div className='container mx-auto px-4'>
              <div className='sm:flex sm:items-center sm:justify-between'>
                <div>
                  <div className='flex items-center gap-x-3'>
                    <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                      Farms
                    </h2>

                    <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 shadow-md'>
                      {totalRecords} lands
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                    These farms have managed in the last 12 months.
                  </p>
                </div>

                <div className='mt-4 flex items-center gap-x-3'>
                  <AButton type='primary' onClick={() => navigate('/app/map')}>
                    <CreateIcon />
                    <span>New farm</span>
                  </AButton>
                </div>
              </div>

              <div className='mt-6 md:flex md:items-center md:justify-between'>
                <div className='relative mt-4 flex items-center md:mt-0'>
                  <span className='absolute'>
                    <SearchIcon />
                  </span>

                  <input
                    type='text'
                    placeholder='Search Name, Location, Owner...'
                    className='block w-full rounded-lg bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 shadow-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80 rtl:pl-5 rtl:pr-11'
                    name='searchString'
                    value={filters.searchString}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='mt-6 flex flex-col shadow-lg'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow-md md:rounded-lg'>
                      <table className='min-w-full divide-y divide-res-draft dark:divide-gray-700'>
                        <thead className='bg-status-white-light text-status-white-dark'>
                          <tr>
                            <th
                              scope='col'
                              className='px-4 py-3.5 text-left text-sm font-normal rtl:text-right'
                            >
                              <button className='flex items-center gap-x-3 focus:outline-none'>
                                <span>Name</span>
                                <SortIcon />
                              </button>
                            </th>

                            <th
                              scope='col'
                              className='px-8 py-3.5 text-left text-sm font-normal rtl:text-right'
                            >
                              Total Area
                            </th>

                            <th
                              scope='col'
                              className='px-4 py-3.5 text-left text-sm font-normal rtl:text-right'
                            >
                              Location
                            </th>

                            <th
                              scope='col'
                              className='px-4 py-3.5 text-left text-sm font-normal rtl:text-right'
                            >
                              Owner
                            </th>
                            <th
                              scope='col'
                              className='px-4 py-3.5 text-left text-sm font-normal rtl:text-right'
                            >
                              Created At
                            </th>
                            <th scope='col' className='relative px-4 py-3.5'>
                              <span className='sr-only'>Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-res-draft bg-white'>
                          {farmList &&
                            farmList.map((farm: farmModel) => (
                              <tr key={farm.id}>
                                <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                  <div>
                                    <h2 className='font-medium text-gray-800'>
                                      {farm.name}
                                    </h2>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-8 py-4 text-sm font-medium'>
                                  <div>
                                    <h2 className='font-medium'>
                                      {farm.area!.toFixed(2)} m²
                                    </h2>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                  <div>
                                    <Link
                                      to={`/app/map?lat=${farm.location!.lat}&lng=${farm.location!.lng}`}
                                      className='flex items-center gap-1 font-medium text-gray-800 text-green-500 underline hover:text-green-400'
                                    >
                                      <MarkerIcon />
                                      See in map
                                    </Link>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                  <div>
                                    <h2 className='font-medium text-gray-800'>
                                      {farm.ownerName == ''
                                        ? 'No owner'
                                        : farm.ownerName}
                                    </h2>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                  <div>
                                    <h2 className='font-medium text-gray-800'>
                                      {format(
                                        new Date(farm.createdAt!.toString()),
                                        'dd/MM/yyyy',
                                      )}
                                    </h2>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                  <div className='flex items-center gap-2'>
                                    <AButton type='link'>
                                      <EditTableIcon />
                                    </AButton>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-4'>
              <Pagination
                currentPageSize={currentPageSize}
                setCurrentPageSize={setCurrentPageSize}
                pageOptions={pageOptions}
                setPageOptions={setPageOptions}
                totalRecords={totalRecords}
              />
            </div>
          </>
        )}
      </div>
    </PageCommon>
  );
};
