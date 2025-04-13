import { Table, TableProps } from 'antd';
import { APagination } from './a-pagination';
import { TablePaginationConfig, TableParams } from '@/utils/models/Tables';
import { isEqual } from 'lodash';

type ATableProps = Omit<TableProps, 'onChange'> & {
  onChange?: (params: TableParams) => void;
  tableParams?: TableParams;
  totalRecord?: number;
};

export const ATable = (props: ATableProps) => {
  const { onChange, tableParams, totalRecord } = props;
  const handleTableChange: TableProps['onChange'] = (_, filters, sorter) => {
    const isFiltersChanged = !isEqual(filters, tableParams?.filters);
    if (onChange) {
      onChange({
        ...tableParams,
        filters,
        sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        sortField: Array.isArray(sorter) ? undefined : sorter.field,
        pagination: {
          ...tableParams?.pagination,
          current: isFiltersChanged ? 1 : tableParams?.pagination?.current,
        },
      });
    }
  };
  const handlePaginationChange = (pages: TablePaginationConfig) => {
    if (onChange) {
      onChange({
        ...tableParams,
        pagination: pages,
      });
    }
  };
  return (
    <>
      <Table
        rowClassName={(_, idx) => (idx % 2 === 0 ? 'even-row' : '')}
        {...props}
        className='shadow-md'
        pagination={false}
        onChange={handleTableChange}
        getPopupContainer={() => document.querySelector('article')!}
      />
      {tableParams?.pagination && (
        <APagination
          pagination={tableParams.pagination}
          onChange={handlePaginationChange}
          totalRecord={totalRecord ?? 0}
          extraAction={tableParams.extraAction}
        />
      )}
    </>
  );
};
