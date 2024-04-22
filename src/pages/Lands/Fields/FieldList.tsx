import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useDeleteFieldMutation, useGetAllFieldsQuery } from '~/api/fieldApi';
import { Modal, Pagination } from '~/common';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';

import { getStatusColor, inputHelper, toastNotify } from '~/helper';
import { fieldModel, pageOptions } from '~/interfaces';
import { SD_FieldStatus } from '~/utils/SD';

const filterOptions = [
  'View all',
  SD_FieldStatus.PLANTED,
  SD_FieldStatus.NEEDS_CARE,
  SD_FieldStatus.AWAITING_HARVEST,
  SD_FieldStatus.HARVESTING
];

export const FieldList = () => {
  // Start State
  const [fieldList, setfieldList] = useState<fieldModel[]>([]);
  const [fieldIdModal, setfieldIdModal] = useState<number>(0);

  const [filters, setFilters] = useState({
    searchString: '',
    status: ''
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
    status: ''
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5
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
      pageSize: pageOptions.pageSize
    })
  });

  const [deleteField] = useDeleteFieldMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleDelete = async (id: number) => {
    try {
      toast.promise(
        deleteField(id),
        {
          pending: 'Processing your request...',
          success: 'Field deleted successfully 👌',

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
          <div className='container px-4 mx-auto'>
            <div className='sm:flex sm:items-center sm:justify-between'>
              <div>
                <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg font-medium text-gray-800 dark:text-white'>Fields</h2>

                  <span className='px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full shadow-md'>
                    {totalRecords} lands
                  </span>
                </div>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  These fields have managed in the last 12 months.
                </p>
              </div>

              <div className='flex items-center mt-4 gap-x-3'>
                <Link
                  to='/app/map'
                  className='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 shadow-lg'
                >
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
                      d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>Add field</span>
                </Link>
              </div>
            </div>

            <div className='mt-6 md:flex md:items-center md:justify-between'>
              <div className='inline-flex overflow-hidden bg-white border border-graydark divide-x rounded-lg rtl:flex-row-reverse '>
                {filterOptions.map((opt: string) => (
                  <button
                    key={opt}
                    className={`px-5 py-2 text-xs font-medium sm:text-sm ${filters.status == opt ? 'bg-black text-white' : 'text-gray-600'} ${filters.status == '' && opt == 'View all' && 'bg-black text-white'} transition-all hover:bg-slate-500 hover:text-white`}
                    onClick={() => setFilters({ ...filters, status: opt == 'View all' ? '' : opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>

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
                  placeholder='Search Name, Farm Name,...'
                  className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  name='searchString'
                  value={filters.searchString}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex flex-col mt-6 shadow-lg'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                      <thead className='bg-status-white-light text-status-white-dark'>
                        <tr>
                          <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right '>
                            <button className='flex items-center gap-x-3 focus:outline-none'>
                              <span>Name</span>

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
                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Farm Name
                          </th>
                          <th scope='col' className='px-8 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Total Area
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Status
                          </th>
                          <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right'>
                            Created At
                          </th>

                          <th scope='col' className='relative py-3.5 px-4'>
                            <span className='sr-only'>Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {fieldList &&
                          fieldList.map((field: fieldModel) => (
                            <tr key={field.id}>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.name}</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.farm?.name}</h2>
                                </div>
                              </td>
                              <td className='px-8 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>{field.area!.toFixed(2)} m²</h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                <span
                                  className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-sm text-${getStatusColor(field.status! as SD_FieldStatus)}-dark leading-none bg-${getStatusColor(field.status! as SD_FieldStatus)}-light rounded-lg`}
                                >
                                  {field.status!}
                                </span>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div>
                                  <h2 className='font-medium text-gray-800'>
                                    {format(new Date(field.createdAt!.toString()), 'dd/MM/yyyy')}
                                  </h2>
                                </div>
                              </td>
                              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                                <div className='flex items-center gap-2'>
                                  <button className='btn btn-accent btn-sm'>
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
                                        d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className='btn btn-sm btn-error'
                                    onClick={() => {
                                      setfieldIdModal(field.id!);
                                      (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
                                    }}
                                  >
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
                                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                                      />
                                    </svg>
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
          <Modal width='' title='delete this field?' onConfirm={() => handleDelete(fieldIdModal)} />
        </>
      )}
    </div>
  );
};
