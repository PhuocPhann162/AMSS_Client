import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllCropTypesQuery } from '@/api/cropTypeApi';
import { Pagination } from '@/common';
import {
  CreateIcon,
  DeleteIcon,
  DetailIcon,
  EditExpandIcon,
  ExpandIcon,
  SearchIcon,
  SortIcon
} from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';
import { getScrollAnimation, inputHelper } from '@/helper';
import { cropModel, cropTypeModel, pageOptions } from '@/interfaces';
import { CropUpsertModal } from './CropUpsertModal';
import { motion } from 'framer-motion';

export const CropTypeList = () => {
  const navigate = useNavigate();
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
  const [selectedCropId, setSelectedCropId] = useState<string>();

  // End State
  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllCropTypesQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

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
                <div className='relative flex items-center md:mt-4 border-none shadow-md rounded-md'>
                  <span className='absolute'>
                    <SearchIcon />
                  </span>

                  <input
                    type='text'
                    placeholder='Search...'
                    className='block w-full py-1.5 pr-5 text-gray-700 bg-white shadow-md rounded-md md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    name='searchString'
                    value={filters.searchString}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='mt-6 md:flex md: flex-col md:items-center gap-4'>
                <div className='flex items-center mt-4 md:mt-0'>
                  <button
                    onClick={() => (document.getElementById('crop_upsert_modal') as HTMLDialogElement)?.showModal()}
                    className='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 shadow-lg hover:shadow-green'
                  >
                    <CreateIcon />
                    <span>New Crop</span>
                  </button>
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
                                  <h2 className='text-type-2'>
                                    {ct.name} ({ct.type})
                                  </h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'></td>
                            </tr>
                            {ct.crops.map((crop: cropModel, index: number) => (
                              <tr key={crop.id} className='border-b border-type-1'>
                                <td className='px-3 py-4 text-sm whitespace-nowrap border-r border-type-1'>
                                  <motion.img
                                    variants={scrollAnimation}
                                    src={crop.icon}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    loading='lazy'
                                    className='w-16 h-16 rounded-full'
                                  />
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
                                    <div className='flex items-center gap-1'>
                                      {crop.fieldCrops &&
                                        crop?.fieldCrops.length >= 1 &&
                                        crop.fieldCrops?.map((fieldCrop) => (
                                          <Link
                                            key={fieldCrop.id}
                                            to={`/app/map?lat=${fieldCrop.field.location?.lat}&lng=${fieldCrop.field.location?.lng}`}
                                            className={`text-center underline align-baseline inline-flex px-4 py-3 mr-auto items-center text-sm text-type-2 leading-none bg-type-1 rounded-lg hover:text-primary`}
                                          >
                                            {fieldCrop.field?.name}
                                          </Link>
                                        ))}
                                    </div>
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
                                        <button
                                          className='text-accent'
                                          onClick={() => navigate(`/app/crop/myCrops/cropDetail/${crop.id}`)}
                                        >
                                          <DetailIcon />
                                          Detail
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSelectedCropId(crop.id);
                                            (
                                              document.getElementById('crop_upsert_modal') as HTMLDialogElement
                                            )?.showModal();
                                          }}
                                          className='text-accent'
                                        >
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
          <CropUpsertModal id={selectedCropId} setSelectedCropId={setSelectedCropId} />
        </>
      )}
    </div>
  );
};
