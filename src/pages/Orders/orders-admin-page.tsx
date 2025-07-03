import { AButton, ASegmented, ATable } from '@/common/ui-common';
import { SearchInput } from '@/components/UI/search-input';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, OrderHeader, OrderStatus } from '@/interfaces';
import { TableParams } from '@/utils/models/Tables';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import {
  ORDER_STATUS_SEGMENTED,
  ORDER_STATUS_FILTER,
} from '@/helper/descriptionItems';
import { OrderStatusTag } from '@/components/UI';
import { AFilterDropdown } from '@/common/ui-common/atoms/a-table/filter-dropdown';
import { useGetOrdersQuery } from '@/api/order-api';
import { GetOrdersOrderBy } from '@/models/request/order/get-orders-request';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageCommon } from '@/components/layout/page/page-common';

const getValidOrderBy = (sortField: unknown): GetOrdersOrderBy => {
  const value = (Array.isArray(sortField) ? sortField[0] : sortField) as string;
  switch (value) {
    case 'orderTotal':
      return 'orderTotal';
    case 'pickupName':
      return 'pickupName';
    case 'orderDate':
      return 'orderDate';
    default:
      return 'orderDate';
  }
};

export function OrdersManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);
  const [segmentedStatus, setSegmentedStatus] = useState<OrderStatus | string>(
    '',
  );

  const [dataTable, setDataTable] = useState<OrderHeader[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const { data, isLoading } = useGetOrdersQuery({
    ...(tableParams.filters &&
    tableParams.filters['status'] &&
    (tableParams.filters['status'] as number[]).length > 0
      ? { statuses: tableParams.filters['status'] as number[] }
      : {}),
    ...(segmentedStatus !== ''
      ? { statuses: [Number(segmentedStatus) as OrderStatus] }
      : {}),
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: getValidOrderBy(tableParams.sortField),
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
    search: searchValue,
  });

  const ordersCol: ColumnsType<OrderHeader> = useMemo(() => {
    return [
      {
        width: '10rem',
        title: 'Id',
        dataIndex: 'id',
        ellipsis: true,
      },
      {
        width: '10rem',
        title: 'Name',
        dataIndex: 'pickupName',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '10rem',
        title: 'Phone Number',
        dataIndex: 'pickupPhoneNumber',
        ellipsis: true,
      },
      {
        width: '10rem',
        title: 'Email',
        dataIndex: 'pickupEmail',
        ellipsis: true,
      },
      {
        width: '7rem',
        title: 'Total Amount',
        dataIndex: 'orderTotal',
        sorter: true,
        ellipsis: true,
        render: (value: number) => `$${value.toFixed(2)}`,
      },
      {
        width: '7rem',
        title: 'Status',
        align: 'center',
        dataIndex: 'status',
        filterDropdown: (props) => (
          <AFilterDropdown {...props} optionsFilter={ORDER_STATUS_FILTER} />
        ),
        render: (value: number) => <OrderStatusTag value={value} />,
      },
      {
        title: 'Order Date',
        align: 'center',
        width: '7rem',
        dataIndex: 'orderDate',
        sorter: true,
        ellipsis: true,
        render: (value: string) => displayDateTimeByLocale(value),
      },
      {
        title: 'Action',
        width: '8rem',
        align: 'center',
        fixed: 'right',
        dataIndex: '_',
        render: (_, record) => (
          <AButton
            type='link'
            className='color-primary hover:underline'
            onClick={() => {
              navigate(`${location.pathname}/${record.id}`);
            }}
            aria-label='View order'
          >
            View
          </AButton>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    const getOrders = () => {
      try {
        setDataTable(data?.result.collection ?? []);
        setTotalRecord(data?.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getOrders();
  }, [searchValue, data, segmentedStatus, tableParams]);

  return (
    <>
      <PageCommon
        headerTitle='All Orders'
        renderHeader={(HeaderComp, title) => (
          <HeaderComp className='flex items-center justify-between'>
            {title}
          </HeaderComp>
        )}
      >
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <SearchInput
              onSearch={(value) => {
                if (value !== searchValue) {
                  setSearchValue(value);
                  setTableParams((pre) => ({
                    ...pre,
                    pagination: {
                      ...pre.pagination,
                      current: 1,
                    },
                  }));
                }
              }}
              placeholder={'Search by Pickup Name or Email'}
              className='w-1/3 min-w-40'
            />
          </div>

          <ASegmented
            options={ORDER_STATUS_SEGMENTED}
            value={segmentedStatus}
            onChange={(value) => {
              if (isLoading) return;
              setSegmentedStatus(value);
              setTableParams((prev) => ({
                ...prev,
                pagination: {
                  ...prev.pagination,
                  current: 1,
                },
              }));
            }}
          />
          <div className='mt-2'>
            <ATable
              columns={ordersCol}
              dataSource={dataTable}
              tableParams={tableParams}
              totalRecord={totalRecord}
              loading={isLoading}
              scroll={{ y: '55vh' }}
              onChange={(params: TableParams) => {
                setTableParams(params);
              }}
              rowKey={(row) => row.id}
            />
          </div>
        </div>
      </PageCommon>
    </>
  );
}
