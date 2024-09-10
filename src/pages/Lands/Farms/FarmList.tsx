import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useDeleteFarmMutation, useGetAllFarmsQuery } from '~/api/farmApi';
import { Modal, Pagination } from '~/common';
import { CreateIcon, DeleteIcon, EditTableIcon, MarkerIcon, SearchIcon, SortIcon } from '~/components/Icon';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { inputHelper, toastNotify } from '~/helper';
import { farmModel, pageOptions } from '~/interfaces';

export const FarmList = () => {
  // Start State
  const [farmList, setFarmList] = useState<farmModel[]>([]);
  const [farmIdModal, setFarmIdModal] = useState<string>('');

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
  // End State

  const [debouncedFilter] = useDebounce(filters, 500);

  const { data, isLoading } = useGetAllFarmsQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });

  const [deleteFarm] = useDeleteFarmMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleDelete = async (id?: string) => {
    try {
      toast.promise(
        deleteFarm(id),
        {
          pending: 'Processing your request...',
          success: 'Farm deleted successfully 👌',
          error: 'An unexpected error occured 🤯'
        },
        {
          theme: 'colored'
        }
      );
      (document.getElementById('fuco_modal') as HTMLDialogElement)?.close();
    } catch (error: any) {
      toastNotify(error.message, 'error');
    }
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
    <div>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <Breadcrumb pageParent='Land' pageName='All Farms' />
          <div className='container px-4 mx-auto'>
            <div className='sm:flex sm:items-center sm:justify-between'>
              <div>
                <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg font-medium text-gray-800 dark:text-white'>Farms</h2>

                  <span className='px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full shadow-md'>
                    {totalRecords} lands
                  </span>
                </div>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  These farms have managed in the last 12 months.
                </p>
              </div>

              <div className='flex items-center mt-4 gap-x-3'>
                <Link
                  to='/app/map'
                  className='flex items-center justify-center w-1/2 px-4 py-2 text-sm tracking-wide shadow-lg text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 hover:shadow-green'
                >
                  <CreateIcon />
                  <span>New farm</span>
                </Link>
              </div>
            </div>

            <div className='mt-6 md:flex md:items-center md:justify-between'>
              <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700'>
                <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300'>
                  View all
                </button>

                <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'>
                  Monitored
                </button>

                <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'>
                  Unmonitored
                </button>
              </div>

              <div className='relative flex items-center mt-4 md:mt-0'>
                <span className='absolute'>
                  <SearchIcon />
                </span>

                <input
                  type='text'
                  placeholder='Search Name, Location, Owner...'
                  className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-bodydark rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  name='searchString'
                  value={filters.searchString}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex flex-col mt-6 shadow-lg'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-bodydark dark:border-gray-700 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-bodydark dark:divide-gray-700'>
                      <thead className='bg-status-white-light text-status-white-dark'>
                        <tr>
                          <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right'>
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>Name</span>
                              <SortIcon />
                            </button>
                          </th>

                          <th scope='col' className='px-8 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Total Area
                          </th>

                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Location
                          </th>

                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Owner
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Created At
                          </th>
                          <th scope='col' className='relative py-3.5 px-4'>
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-bodydark'>
                        {farmList &&
                          farmList.map((farm: farmModel) => (
                            <tr key={farm.id}>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{farm.name}</h2>
                                </div>
                              </td>
                              <td className='px-8 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium'>{farm.area!.toFixed(2)} m²</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <Link
                                    to={`/app/map?lat=${farm.location!.lat}&lng=${farm.location!.lng}`}
                                    className='font-medium text-gray-800 flex items-center underline text-green-500 gap-1 hover:text-green-400'
                                  >
                                    <MarkerIcon />
                                    See in map
                                  </Link>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {farm.ownerName == '' ? 'No owner' : farm.ownerName}
                                  </h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {format(new Date(farm.createdAt!.toString()), 'dd/MM/yyyy')}
                                  </h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div className='flex items-center gap-2'>
                                  <button className='btn btn-accent btn-sm'>
                                    <EditTableIcon />
                                  </button>
                                  <button
                                    className='btn btn-sm btn-error'
                                    onClick={() => {
                                      setFarmIdModal(farm.id!);
                                      (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
                                    }}
                                  >
                                    <DeleteIcon />
                                  </button>
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
          <Modal width='' title='delete this farm?' onConfirm={() => handleDelete(farmIdModal)} />
        </>
      )}
    </div>
  );
};
