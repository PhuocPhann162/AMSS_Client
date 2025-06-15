import type { AnyObject } from 'antd/es/_util/type';
import Table, { type TableProps } from 'antd/es/table';
import { twMerge } from 'tailwind-merge';

export interface SimpleTableProps<T extends AnyObject = AnyObject>
  extends Omit<TableProps<T>, 'rowKey'> {
  rowKey: NonNullable<TableProps<T>['rowKey']>;
}

export const SimpleTable = <T extends AnyObject = AnyObject>(
  props: SimpleTableProps<T>,
) => {
  const antSpinNestedLoadingClassName =
    '[&_.ant-spin-nested-loading]:flex [&_.ant-spin-nested-loading]:min-w-0';
  const antSpinContainerClassName =
    '[&_.ant-spin-container]:flex [&_.ant-spin-container]:flex-col [&_.ant-spin-container]:min-w-0';
  const antTableClassName =
    '[&_.ant-table]:flex [&_.ant-table]:min-h-0 [&_.ant-table]:grow';
  const antTableContainerClassName =
    '[&_.ant-table-container]:flex [&_.ant-table-container]:grow [&_.ant-table-container]:flex-col [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:min-w-0';
  const antTableHeaderClassName = '[&_.ant-table-header]:shrink-0';
  const antTableBodyClassName =
    '[&_.ant-table-body]:!overflow-auto [&_.ant-table-body]:grow';

  return (
    <Table<T>
      size={'small'}
      {...props}
      scroll={{ y: '100%', x: 'max-content', ...props.scroll }}
      pagination={
        props.pagination
          ? {
              showSizeChanger: true,
              ...props.pagination,
            }
          : false
      }
      rootClassName={twMerge(
        'min-h-0 flex',
        antTableBodyClassName,
        antTableHeaderClassName,
        antTableContainerClassName,
        antSpinContainerClassName,
        antTableClassName,
        antSpinNestedLoadingClassName,
        props.rootClassName,
      )}
    />
  );
};
