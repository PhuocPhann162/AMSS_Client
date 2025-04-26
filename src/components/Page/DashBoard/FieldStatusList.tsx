import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllFieldsQuery } from '@/api';
import { MarkerIcon, SortIcon } from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';

import { getStatusColor } from '@/helper';
import { fieldModel, pageOptions } from '@/interfaces';
import { PopupCrop } from '../Crop';
import { ATag } from '@/common/ui-common';

export const FieldStatusList = () => {
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

  useEffect(() => {
    if (data) {
      setfieldList(data.apiResponse.result as fieldModel[]);
      const { TotalRecords } = JSON.parse(data.totalRecords as string);
      setTotalRecords(TotalRecords as number);
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
          <div className='container mx-auto px-4'>
            <div className='mt-6 md:flex md:items-center md:justify-between'>
              <div>
                <h1 className='text-black-2 text-xl font-bold'>Fields</h1>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  This is list of latest field.
                </p>
              </div>

              <div className='relative mt-4 flex items-center md:mt-0'>
                <Link
                  to='/app/land/field/allFields'
                  className='text-primary underline hover:text-green-400'
                >
                  View All
                </Link>
              </div>
            </div>

            <div className='mt-6 flex flex-col shadow-default'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6'>
                  <div className='overflow-hidden md:rounded-lg'>
                    <table className='min-w-full'>
                      <thead className='bg-status-white-light text-status-white-dark'>
                        <tr className='font-bold'>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm rtl:text-right'
                          >
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>Name</span>

                              <SortIcon />
                            </button>
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm rtl:text-right'
                          >
                            Farm Name
                          </th>
                          <th
                            scope='col'
                            className='px-8 py-3.5 text-left text-sm rtl:text-right'
                          >
                            Total Area
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm rtl:text-right'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm rtl:text-right'
                          >
                            Location
                          </th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-left text-sm rtl:text-right'
                          >
                            Planted Crop
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
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
                                  {field.status}
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
                              <td className='whitespace-nowrap px-4 py-4 text-sm'>
                                <PopupCrop fieldId={field.id!} />
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
        </>
      )}
    </div>
  );
};
