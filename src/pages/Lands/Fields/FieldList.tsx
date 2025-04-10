import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllFieldsQuery } from '@/api/fieldApi';
import { Pagination } from '@/common';
import { AButton, ATag } from '@/common/ui-common';
import {
  CreateIcon,
  EditTableIcon,
  MarkerIcon,
  SearchIcon,
  SortIcon,
} from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';
import { Breadcrumb } from '@/components/UI';

import { getStatusColor, inputHelper } from '@/helper';
import { fieldModel, pageOptions } from '@/interfaces';
import { SD_FieldStatus } from '@/utils/SD';

const filterOptions = [
  'View all',
  SD_FieldStatus.PLANTED,
  SD_FieldStatus.NEEDS_CARE,
  SD_FieldStatus.AWAITING_HARVEST,
  SD_FieldStatus.HARVESTING,
];

export const FieldList = () => {
  const navigate = useNavigate();
  // Start State
  const [fieldList, setfieldList] = useState<fieldModel[]>([]);

  const [filters, setFilters] = useState({
    searchString: '',
    status: '',
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
    status: '',
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  // End State

  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllFieldsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
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
      setfieldList(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  useEffect(() => {
    setApiFilters(filters);
  }, [debouncedFilter]);

  return (
    <div>
      {isLoading && <MainLoader />}

      {!isLoading && (
        <>
          <Breadcrumb pageParent='Land' pageName='All fields' />
          <div className='container mx-auto px-4'>
            <div className='sm:flex sm:items-center sm:justify-between'>
              <div>
                <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                    Fields
                  </h2>

                  <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 shadow-md'>
                    {totalRecords} lands
                  </span>
                </div>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  These fields have managed in the last 12 months.
                </p>
              </div>

              <div className='mt-4 flex items-center gap-x-3'>
                <Link
                  to='/app/map'
                  className='hover:shadow-green flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-green-500 px-5 py-2 text-sm tracking-wide text-white shadow-lg transition-colors duration-200 hover:bg-green-600 sm:w-auto'
                >
                  <CreateIcon />
                  <span>New field</span>
                </Link>
              </div>
            </div>

            <div className='mt-6 md:flex md:items-center md:justify-between'>
              <div className='inline-flex divide-x divide-res-draft overflow-hidden rounded-lg bg-white shadow-md rtl:flex-row-reverse'>
                {filterOptions.map((opt: string) => (
                  <button
                    key={opt}
                    className={`px-5 py-2 text-xs font-medium sm:text-sm ${filters.status == opt ? 'bg-black text-white' : 'text-gray-600'} ${filters.status == '' && opt == 'View all' && 'bg-black text-white'} transition-all hover:bg-slate-500 hover:text-white`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        status: opt == 'View all' ? '' : opt,
                      })
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className='relative mt-4 flex items-center md:mt-0'>
                <span className='absolute'>
                  <SearchIcon />
                </span>

                <input
                  type='text'
                  placeholder='Search Name, Farm Name,...'
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
                            className='px-4 py-3.5 text-left text-sm font-semibold rtl:text-right'
                          >
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>Name</span>

                              <SortIcon />
                            </button>
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-semibold rtl:text-right'
                          >
                            Farm Name
                          </th>
                          <th
                            scope='col'
                            className='px-8 py-3.5 text-left text-sm font-semibold rtl:text-right'
                          >
                            Total Area
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-semibold rtl:text-right'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm font-semibold rtl:text-right'
                          >
                            Location
                          </th>

                          <th scope='col' className='relative px-4 py-3.5'>
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-res-draft bg-white'>
                        {fieldList &&
                          fieldList.map((field: fieldModel) => (
                            <tr key={field.id}>
                              <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {field.name}
                                  </h2>
                                </div>
                              </td>
                              <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {field.farm?.name}
                                  </h2>
                                </div>
                              </td>
                              <td className='whitespace-nowrap px-8 py-4 text-sm font-medium'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {field.area!.toFixed(2)} m²
                                  </h2>
                                </div>
                              </td>
                              <td className='whitespace-nowrap px-4 py-4 text-sm'>
                                <ATag color={getStatusColor(field.status!)}>
                                  {field.status!}
                                </ATag>
                              </td>
                              <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    <Link
                                      to={`/app/map?lat=${field.location!.lat}&lng=${field.location!.lng}`}
                                      className='flex items-center gap-1 font-medium text-green-500 underline underline-offset-4 hover:text-green-400 hover:decoration-2'
                                    >
                                      <MarkerIcon />
                                      See in map
                                    </Link>
                                  </h2>
                                </div>
                              </td>
                              <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                                <div className='flex items-center gap-2'>
                                  <AButton
                                    type='link'
                                    onClick={() =>
                                      navigate(
                                        `/app/land/field/updateField/${field.id}`,
                                      )
                                    }
                                  >
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
  );
};
