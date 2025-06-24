import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetAllCropTypesQuery } from '@/api';
import { Pagination } from '@/common';
import {
  CreateIcon,
  DetailIcon,
  EditTableIcon,
  ExpandIcon,
  SearchIcon,
  SortIcon,
} from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';
import { getScrollAnimation, inputHelper } from '@/helper';
import { cropModel, cropTypeModel, pageOptions } from '@/interfaces';
import { CropUpsertModal } from './CropUpsertModal';
import { motion } from 'framer-motion';
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';
import { PageCommon } from '@/components/layout/page/page-common';

export const CropTypeList = () => {
  const navigate = useNavigate();
  // Start State
  const [isOpenCropUpsertModal, setIsOpenCropUpsertModal] =
    useState<boolean>(false);
  const [cropTypeList, setCropTypeList] = useState<cropTypeModel[]>([]);
  const [filters, setFilters] = useState({
    searchString: '',
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 10,
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
      pageSize: pageOptions.pageSize,
    }),
  });
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const dropDownMenuItems = (cropId: string) => [
    {
      label: (
        <Button
          type='link'
          onClick={() => {
            navigate(`/app/crop/myCrops/cropDetail/${cropId}`);
          }}
          style={{ color: '#5D3D2E' }}
        >
          <DetailIcon /> Detail
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          type='link'
          onClick={() => {
            setSelectedCropId(cropId);
            setIsOpenCropUpsertModal(true);
          }}
          style={{ color: '#5D3D2E' }}
        >
          <EditTableIcon /> Edit
        </Button>
      ),
      key: '1',
    },
  ];

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
    <>
      <CropUpsertModal
        isOpen={isOpenCropUpsertModal}
        setIsOpen={setIsOpenCropUpsertModal}
        id={selectedCropId}
        setSelectedCropId={setSelectedCropId}
      />
      <PageCommon
        headerTitle='Crop Types'
        renderHeader={(Header, title) => (
          <Header className='flex flex-col gap-3'>
            <div className='flex items-center gap-x-3'>
              {title}
              <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 shadow-md'>
                {totalRecords} types
              </span>
            </div>
            <p className='text-sm text-gray-500 dark:text-gray-300'>
              These farms have managed in the last 12 months.
            </p>
            <div className='flex items-center gap-x-3'>
              <div className='relative flex items-center rounded-md border-none shadow-md'>
                <span className='absolute'>
                  <SearchIcon />
                </span>

                <input
                  type='text'
                  placeholder='Search...'
                  className='block w-full rounded-md bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 shadow-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80 rtl:pl-5 rtl:pr-11'
                  name='searchString'
                  value={filters.searchString}
                  onChange={handleChange}
                />
              </div>
              <Button
                type='primary'
                onClick={() => setIsOpenCropUpsertModal(true)}
              >
                <CreateIcon />
                <span>New Crop</span>
              </Button>
            </div>
          </Header>
        )}
      >
        {isLoading && <MainLoader />}
        {!isLoading && data && (
          <>
            <div className='container mx-auto'>
              <div className='mt-6 flex flex-col shadow-lg'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden'>
                      <table className='min-w-full'>
                        <thead className='bg-white font-bold text-type-2'>
                          <tr>
                            <th
                              scope='col'
                              className='h-24 w-24 border-r border-type-1 px-3 py-4 text-sm'
                            ></th>
                            <th
                              scope='col'
                              className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
                            >
                              <button className='flex items-center gap-x-3 focus:outline-none'>
                                <span>CropType</span>
                                <SortIcon />
                              </button>
                            </th>

                            <th
                              scope='col'
                              className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
                            >
                              Planted
                            </th>

                            <th
                              scope='col'
                              className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
                            >
                              Expected
                            </th>
                            <th scope='col' className='relative px-4 py-3.5'>
                              <span className='sr-only'>Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white'>
                          {cropTypeList.map((ct: cropTypeModel) => (
                            <>
                              <tr
                                key={ct.id}
                                className='border-b border-type-1 bg-type-1 font-bold'
                              >
                                <td className='whitespace-nowrap border-r border-type-1 px-3 py-4 text-sm'></td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm'>
                                  <div>
                                    <h2 className='text-type-2'>
                                      {ct.name} ({ct.type})
                                    </h2>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm'></td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm'></td>
                                <td className='whitespace-nowrap px-4 py-4 text-sm'></td>
                              </tr>
                              {ct.crops.map((crop: cropModel) => (
                                <tr
                                  key={crop.id}
                                  className='border-b border-type-1'
                                >
                                  <td className='whitespace-nowrap border-r border-type-1 px-3 py-4 text-sm'>
                                    <motion.img
                                      variants={scrollAnimation}
                                      src={crop.icon}
                                      initial={{ opacity: 0 }}
                                      whileInView={{ opacity: 1 }}
                                      viewport={{ once: true }}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      loading='lazy'
                                      className='h-16 w-16 rounded-full object-cover'
                                    />
                                  </td>
                                  <td className='w-64 whitespace-nowrap border-r border-type-1 px-4 py-4 text-sm'>
                                    <div>
                                      <div className='flex items-center gap-2'>
                                        <h2 className='font-bold text-sky-500'>
                                          {crop.name}
                                        </h2>
                                        <span
                                          className={`mr-auto inline-flex items-center rounded-lg bg-type-1 px-3 py-2 text-center align-baseline text-xs leading-none text-type-2`}
                                        >
                                          {ct.code}
                                        </span>
                                      </div>
                                      <h4 className='w-full text-wrap text-justify text-xs opacity-80'>
                                        {crop.description}
                                      </h4>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap border-r border-type-1 px-4 py-4 text-base'>
                                    <div className='flex items-center gap-2'>
                                      {crop.cultivatedArea?.toFixed(2)} sqft
                                      <div className='flex items-center gap-1'>
                                        {crop.fieldCrops &&
                                          crop?.fieldCrops.length >= 1 &&
                                          crop.fieldCrops?.map((fieldCrop) => (
                                            <Link
                                              key={fieldCrop.id}
                                              to={`/app/map?lat=${fieldCrop.field.location?.lat}&lng=${fieldCrop.field.location?.lng}`}
                                              className={`mr-auto inline-flex items-center rounded-lg bg-type-1 px-4 py-3 text-center align-baseline text-sm leading-none text-type-2 underline hover:text-primary`}
                                            >
                                              {fieldCrop.field?.name}
                                            </Link>
                                          ))}
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap border-r border-type-1 px-4 py-4 text-sm'>
                                    <div>
                                      Expected{' '}
                                      {format(
                                        new Date(crop.expectedDate!),
                                        'MMM. dd, yyyy',
                                      )}
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap border-r border-type-1 px-4 py-4 text-base'>
                                    <Dropdown
                                      menu={{
                                        items: dropDownMenuItems(crop.id!),
                                      }}
                                    >
                                      <Button
                                        type='link'
                                        style={{ color: '#000000' }}
                                      >
                                        <ExpandIcon />
                                      </Button>
                                    </Dropdown>
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
          </>
        )}
      </PageCommon>
    </>
  );
};
