import { Link } from 'react-router-dom';
import { useDeleteFarmMutation } from '~/api/farmApi';
import farmModel from '~/interfaces/farmModel';
import { Modal } from './Modal';
import { toastNotify } from '~/helper';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface ListTableProps {
  farmList: farmModel[];
}

const ListTable = ({ farmList }: ListTableProps) => {
  const [farmIdModal, setFarmIdModal] = useState<number>(0);
  const [deleteFarm] = useDeleteFarmMutation();

  const handleDelete = async (id: number) => {
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

  return (
    <div className='container px-4 mx-auto'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <div>
          <div className='flex items-center gap-x-3'>
            <h2 className='text-lg font-medium text-gray-800 dark:text-white'>Farms</h2>

            <span className='px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full'>{farmList?.length} lands</span>
          </div>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
            These farms have managed in the last 12 months.
          </p>
        </div>

        <div className='flex items-center mt-4 gap-x-3'>
          <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_3098_154395)'>
                <path
                  d='M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832'
                  stroke='currentColor'
                  strokeWidth='1.67'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_3098_154395'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>

            <span>Import</span>
          </button>

          <Link
            to='/app/map'
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>

            <span>Add farm</span>
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
            placeholder='Search'
            className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <thead className='bg-gray-50 dark:bg-gray-800'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
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

                    <th
                      scope='col'
                      className='px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
                      Total Area
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
                      Location
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
                      Owner
                    </th>
                    <th scope='col' className='relative py-3.5 px-4'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
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
                            <h2 className='font-medium text-gray-800'>{farm.area.toFixed(2)} m²</h2>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <Link
                              to={`/app/map?lat=${farm.location.lat}&lng=${farm.location.lng}`}
                              className='font-medium text-gray-800 flex items-center underline text-primary gap-1'
                            >
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
                                  d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                                />
                              </svg>
                              See in map
                            </Link>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div>
                            <h2 className='font-medium text-gray-800'>Owner Name</h2>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          <div className='flex items-center gap-2'>
                            <button className='btn btn-outline btn-accent btn-sm'>
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
                              className='btn btn-sm btn-outline btn-error'
                              onClick={() => {
                                setFarmIdModal(farm.id);
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

      <Modal width='' title='delete this farm?' onConfirm={() => handleDelete(farmIdModal)} />
    </div>
  );
};

export default ListTable;
