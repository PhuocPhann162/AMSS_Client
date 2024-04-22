import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllCropTypesQuery } from '~/api/cropTypeApi';
import { Modal, Pagination } from '~/common';
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // End State
  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllCropTypesQuery({
    ...(apiFilters && {
      SearchControl: apiFilters.searchString,
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-5 h-5 mx-3 text-gray-400 dark:text-gray-600'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                      />
                    </svg>
                  </span>

                  <input
                    type='text'
                    placeholder='Search...'
                    className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
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

                              <svg className='h-3' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  d='M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.1'
                                />
                                <path
                                  d='M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.1'
                                />
                                <path
                                  d='M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z'
                                  fill='currentColor'
                                  stroke='currentColor'
                                  strokeWidth='0.3'
                                />
                              </svg>
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
                                        className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center text-sm text-type-2 leading-none bg-type-1 rounded-lg`}
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
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth='1.5'
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
                                        />
                                      </svg>
                                    </div>
                                    <ul
                                      tabIndex={index}
                                      className='dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52'
                                    >
                                      <li>
                                        <button>
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth='1.5'
                                            stroke='currentColor'
                                            className='w-5 h-5'
                                          >
                                            <path
                                              strokeLinecap='round'
                                              strokeLinejoin='round'
                                              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                                            />
                                          </svg>
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button>Current Planting</button>
                                      </li>
                                      <li>
                                        <button>Delete</button>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* <!-- Dropdown End --> */}
                                </td>
                              </tr>
                            ))}
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