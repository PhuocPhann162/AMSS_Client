import { Table, TableProps } from 'antd';
import { APagination } from './a-pagination';
import { TablePaginationConfig, TableParams } from '@/utils/models/Tables';

type ATableProps = Omit<TableProps, 'onChange'> & {
  onChange?: (params: TableParams) => void;
  tableParams?: TableParams;
  totalRecord?: number;
};

export const ATable = (props: ATableProps) => {
  const { onChange, tableParams, totalRecord } = props;
  const handleTableChange: TableProps['onChange'] = (_, filters, sorter) => {
    onChange &&
      onChange({
        ...tableParams,
        filters,
        sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
        sortField: Array.isArray(sorter) ? undefined : sorter.field
      });
  };
  const handlePaginationChange = (pages: TablePaginationConfig) => {
    onChange &&
      onChange({
        ...tableParams,
        pagination: pages
      });
  };
  return (
    <>
      <Table
        rowClassName={(_, idx) => (idx % 2 === 0 ? 'bg-[#f0f0f0] even-row' : '')}
        {...props}
        pagination={false}
        onChange={handleTableChange}
      />
      {tableParams?.pagination && (
        <APagination
          pagination={tableParams.pagination}
          onChange={handlePaginationChange}
          totalRecord={totalRecord || 0}
        />
      )}
    </>
  );
};
