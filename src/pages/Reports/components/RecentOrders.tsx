import { useGetOrdersQuery } from '@/api/order-api';
import { ATable } from '@/common/ui-common';
import { OrderStatusTag } from '@/components/UI';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, OrderHeader } from '@/interfaces';
import { GET_ORDERS_ORDER_BY } from '@/models/request/order/get-orders-request';
import { TableParams } from '@/utils/models/Tables';
import { Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

export const RecentOrders = () => {
  const [dataTable, setDataTable] = useState<OrderHeader[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const { data, isLoading } = useGetOrdersQuery({
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: GET_ORDERS_ORDER_BY.orderDate,
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
  });

  const ordersCol: ColumnsType<OrderHeader> = useMemo(() => {
    return [
      {
        width: '10rem',
        title: 'Name',
        dataIndex: 'pickupName',
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
        ellipsis: true,
        render: (value: number) => `$${value.toFixed(2)}`,
      },
      {
        width: '7rem',
        title: 'Status',
        align: 'center',
        dataIndex: 'status',
        render: (value: number) => <OrderStatusTag value={value} />,
      },
      {
        title: 'Order Date',
        align: 'center',
        width: '7rem',
        dataIndex: 'orderDate',
        ellipsis: true,
        render: (value: string) => displayDateTimeByLocale(value),
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
  }, [data, tableParams]);

  return (
    <Card
      className='h-full rounded-lg shadow'
      title={<span className='font-semibold'>Recent Orders</span>}
    >
      <ATable
        columns={ordersCol}
        dataSource={dataTable}
        totalRecord={totalRecord}
        loading={isLoading}
        scroll={{ y: '55vh' }}
        onChange={(params: TableParams) => {
          setTableParams(params);
        }}
        rowKey={(row) => row.id}
        className='!shadow-none'
      />
    </Card>
  );
};
