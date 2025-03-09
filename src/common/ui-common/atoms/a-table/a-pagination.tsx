import { Pagination } from 'antd';
import { useMemo } from 'react';
import { TablePaginationConfig } from '@/utils/models/Tables';
import { ASelect } from '../a-select';

type APaginationProps = {
  pagination: TablePaginationConfig;
  onChange: (pages: TablePaginationConfig) => void;
  totalRecord: number;
};

export const APagination = (props: APaginationProps) => {
  const { pagination, onChange, totalRecord } = props;
  const { current = 0, pageSize = 10, pageSizeOptions = [10, 20, 50, 100] } = pagination;

  const pageSizeOptionsSelect = useMemo(() => {
    return pageSizeOptions.map((pageSize) => ({
      label: pageSize.toString() + '/page',
      value: pageSize
    }));
  }, [pageSizeOptions]);

  const onPageChange = (page: number, pageSize: number) => {
    onChange({
      ...pagination,
      pageSize,
      current: page
    });
  };

  const onPageSizeChange = (pageSize: number) => {
    onChange({
      ...pagination,
      current: pageSize * current > totalRecord ? 1 : current,
      pageSize
    });
  };

  return (
    <div className='grid grid-cols-3 my-3'>
      <div>
        <ASelect
          showSearch
          options={pageSizeOptionsSelect}
          optionFilterProp='label'
          size='small'
          value={pageSize}
          onChange={onPageSizeChange}
        />
      </div>
      <div className='text-center w-full font-sm text-sm'>
        {`Show ${totalRecord > 0 ? (current - 1) * pageSize + 1 : 0} to
        ${Math.min(current * pageSize, totalRecord)} of
        ${totalRecord} Item(s)`}
      </div>
      <Pagination
        align='end'
        current={current}
        total={totalRecord}
        pageSize={pageSize}
        size='small'
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};
