import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useGetAllCropTypesQuery } from '~/api/cropTypeApi';
import { Modal, Pagination } from '~/common';
import { DeleteIcon, EditExpandIcon, ExpandIcon, SearchIcon, SortIcon } from '~/components/Icon';
import { MainLoader } from '~/components/Page/common';
import { inputHelper } from '~/helper';
import { cropModel, cropTypeModel, pageOptions } from '~/interfaces';

export const CropTypeList = () => {
  // Start State
  const [cropTypeList, setCropTypeList] = useState<cropTypeModel[]>([]);
  const [filters, setFilters] = useState({
    searchString: ''
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: ''
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 10
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);

  // End State
  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllCropTypesQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  useEffect(() => {
    if (data) {
      setCropTypeList(data.apiResponse.result);
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
      {!isLoading && data && (
        <>
          <div className='container px-4 mx-auto'>
            <div className='sm:flex sm:items-center sm:justify-between'>
              <div>
                <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg text-gray-800 dark:text-white'>Crop Types</h2>

                  <span className='px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full shadow-md'>
                    {totalRecords} types
                  </span>
                </div>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  These farms have managed in the last 12 months.
                </p>
              </div>
              <div className='mt-6 md:flex md:items-center md:justify-between'>
                <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700'></div>

                <div className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <SearchIcon />
                  </span>

                  <input
                    type='text'
                    placeholder='Search...'
                    className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-bodydark rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    name='searchString'
                    value={filters.searchString}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col mt-6 shadow-lg'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full'>
                      <thead className='bg-white text-type-2 font-bold'>
                        <tr>
                          <th scope='col' className='px-3 py-4 text-sm w-24 border-r border-type-1'></th>
                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'
                          >
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>CropType</span>
                              <SortIcon />
                            </button>
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'
                          >
                            Planted
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'
                          >
                            Expected
                          </th>
                          <th scope='col' className='relative py-3.5 px-4'>
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {cropTypeList.map((ct: cropTypeModel) => (
                          <>
                            <tr key={ct.id} className='bg-type-1 font-bold border-b border-type-1'>
                              <td className='px-3 py-4 text-sm whitespace-nowrap border-r border-type-1'></td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                <div>
                                  <h2 className='text-type-2'>{ct.name}</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                            </tr>
                            <span key={ct.id}>
                              {ct.crops.map((crop: cropModel, index: number) => (
                                <tr key={crop.id} className='border-b border-type-1'>
                                  <td className='px-3 py-4 text-sm whitespace-nowrap border-r border-type-1'>
                                    <img src={crop.icon} className='w-20 rounded-full' />
                                  </td>
                                  <td className='px-4 py-4 text-sm whitespace-nowrap border-r border-type-1'>
                                    <div>
                                      <div className='flex items-center gap-2'>
                                        <h2 className='text-pearl font-bold'>{crop.name}</h2>
                                        <span
                                          className={`text-center align-baseline inline-flex px-3 py-2 mr-auto items-center text-xs text-type-2 leading-none bg-type-1 rounded-lg`}
                                        >
                                          {ct.code}
                                        </span>
                                      </div>
                                      <h4 className='w-40 text-wrap text-xs opacity-80'>{crop.description}</h4>
                                    </div>
                                  </td>
                                  <td className='px-4 py-4 text-base whitespace-nowrap border-r border-type-1'>
                                    <div className='flex items-center gap-2'>
                                      {crop.cultivatedArea?.toFixed(2)} sqft
                                      <span
                                        className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center text-sm text-type-2 leading-none bg-type-1 rounded-lg`}
                                      >
                                        {crop.field?.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className='px-4 py-4 text-sm whitespace-nowrap border-r border-type-1'>
                                    <div>Expected {format(new Date(crop.expectedDate!), 'MMM. dd, yyyy')}</div>
                                  </td>
                                  <td className='px-4 py-4 text-base whitespace-nowrap border-r border-type-1'>
                                    {/* <!-- Dropdown Start --> */}
                                    <div className='dropdown dropdown-left dropdown-bottom dropdown-hover'>
                                      <div tabIndex={index} role='button' className=' m-1'>
                                        <ExpandIcon />
                                      </div>
                                      <ul
                                        tabIndex={index}
                                        className='dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52'
                                      >
                                        <li>
                                          <button className='text-accent'>
                                            <EditExpandIcon />
                                            Edit
                                          </button>
                                        </li>
                                        <li>
                                          <button className='text-danger'>
                                            <DeleteIcon />
                                            Delete
                                          </button>
                                        </li>
                                      </ul>
                                    </div>

                                    {/* <!-- Dropdown End --> */}
                                  </td>
                                </tr>
                              ))}
                            </span>
                          </>
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
          {/* <Modal width='' title='delete this farm?' onConfirm={() => handleDelete(farmIdModal)} /> */}
        </>
      )}
    </div>
  );
};
