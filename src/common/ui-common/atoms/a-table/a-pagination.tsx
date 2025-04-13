import { Pagination } from 'antd';
import { useEffect, useMemo } from 'react';
import { ASelect } from '../a-select';
import { ExtraAction, TablePaginationConfig } from '@/utils/models/Tables';

type APaginationProps = {
  pagination: TablePaginationConfig;
  onChange: (pages: TablePaginationConfig) => void;
  totalRecord: number;
  extraAction?: ExtraAction[];
};

export const APagination = (props: APaginationProps) => {
  const { pagination, onChange, totalRecord, extraAction } = props;
  const {
    current = 0,
    pageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
  } = pagination;
  const showCount = useMemo(() => {
    return totalRecord > 0 ? (current - 1) * pageSize + 1 : 0;
  }, [current, pageSize, totalRecord]);
  const pageSizeOptionsSelect = useMemo(() => {
    return pageSizeOptions.map((pageSize) => ({
      label: pageSize.toString(),
      value: pageSize,
    }));
  }, [pageSizeOptions]);

  useEffect(() => {
    if (showCount > totalRecord) {
      onChange({
        ...pagination,
        current: current - 1,
      });
    }
  }, [showCount, current, totalRecord, onChange, pagination]);

  const onPageChange = (page: number, pageSize: number) => {
    onChange({
      ...pagination,
      pageSize,
      current: page,
    });
  };

  const onPageSizeChange = (pageSize: number) => {
    onChange({
      ...pagination,
      current: pageSize * current > totalRecord ? 1 : current,
      pageSize,
    });
  };

  return (
    <div className='my-3 grid grid-cols-3'>
      <div>
        <ASelect
          showSearch
          className='!w-16'
          options={pageSizeOptionsSelect}
          optionFilterProp='label'
          allowClear={false}
          size='small'
          value={pageSize}
          onChange={onPageSizeChange}
        />{' '}
        Items/Page
      </div>
      <div className='font-sm w-full text-center text-sm'>
        {`Show ${showCount} to
        ${Math.min(current * pageSize, totalRecord)} of
        ${totalRecord} Item(s)`}
      </div>
      <div className='flex justify-end gap-4'>
        {extraAction?.map((action) => action.element)}
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
    </div>
  );
};
