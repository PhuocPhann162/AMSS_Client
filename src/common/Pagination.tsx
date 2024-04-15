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
  totalRecords
}: PaginationProps) => {
  const getPageDetails = () => {
    const dataStartRecordNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndRecordNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartRecordNumber} - ${
      dataEndRecordNumber < totalRecords ? dataEndRecordNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handlePageOptionsChange = (direction: string, pageSize?: number) => {
    if (direction === 'prev') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber - 1
      });
    } else if (direction === 'next') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber + 1
      });
    } else if (direction === 'change') {
      setPageOptions({
        pageSize: pageSize ? pageSize : currentPageSize,
        pageNumber: 1
      });
    }
  };

  return (
    <div className='mt-2 sm:flex sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
        <div>Row per page: </div>
        <select
          className='select select-bordered select-sm max-w-xs select-warning w-18 bg-white'
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
          Page <span className='font-medium text-gray-700 dark:text-gray-100'>{getPageDetails()}</span>
        </div>
      </div>

      <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
        {pageOptions.pageNumber === 1 ? (
          <></>
        ) : (
          <button
            onClick={() => handlePageOptionsChange('prev')}
            className='btn btn-outline btn-info flex items-center justify-center text-sm capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5 rtl:-scale-x-100'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
            </svg>

            <span>Previous</span>
          </button>
        )}

        {pageOptions.pageNumber * pageOptions.pageSize >= totalRecords ? (
          <></>
        ) : (
          <button
            onClick={() => handlePageOptionsChange('next')}
            className='btn btn-outline btn-info flex items-center justify-center text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
          >
            <span>Next</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5 rtl:-scale-x-100'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
