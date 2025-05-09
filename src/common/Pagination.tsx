import { AButton } from './ui-common';

interface PaginationProps {
  currentPageSize: number;
  setCurrentPageSize: (value: number) => void;
  pageOptions: { pageNumber: number; pageSize: number };
  setPageOptions: (value: { pageNumber: number; pageSize: number }) => void;
  totalRecords: number;
}

export const Pagination = ({
  currentPageSize,
  setCurrentPageSize,
  pageOptions,
  setPageOptions,
  totalRecords,
}: PaginationProps) => {
  const getPageDetails = () => {
    const dataStartRecordNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndRecordNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartRecordNumber} - ${
      dataEndRecordNumber < totalRecords ? dataEndRecordNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handlePageOptionsChange = (direction: string, pageSize?: number) => {
    if (direction === 'prev') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber - 1,
      });
    } else if (direction === 'next') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber + 1,
      });
    } else if (direction === 'change') {
      setPageOptions({
        pageSize: pageSize ? pageSize : currentPageSize,
        pageNumber: 1,
      });
    }
  };

  return (
    <div className='mt-2 sm:flex sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2 text-sm'>
        <div>Row per page: </div>
        <select
          className='select select-bordered select-sm select-warning w-18 max-w-xs bg-white'
          value={currentPageSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handlePageOptionsChange('change', Number(e.target.value));
            setCurrentPageSize(Number(e.target.value));
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
        <div className='divider divider-horizontal divider-accent'></div>
        <div>
          Page{' '}
          <span className='font-medium text-gray-700 dark:text-gray-100'>
            {getPageDetails()}
          </span>
        </div>
      </div>

      <div className='mt-4 flex items-center gap-x-4 sm:mt-0'>
        {pageOptions.pageNumber === 1 ? (
          <></>
        ) : (
          <AButton
            variant='solid'
            color='cyan'
            onClick={() => handlePageOptionsChange('prev')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5 rtl:-scale-x-100'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
              />
            </svg>

            <span>Previous</span>
          </AButton>
        )}

        {pageOptions.pageNumber * pageOptions.pageSize >= totalRecords ? (
          <></>
        ) : (
          <AButton
            variant='solid'
            color='cyan'
            onClick={() => handlePageOptionsChange('next')}
          >
            <span>Next</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5 rtl:-scale-x-100'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
              />
            </svg>
          </AButton>
        )}
      </div>
    </div>
  );
};
