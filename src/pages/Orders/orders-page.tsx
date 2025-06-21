import { useGetOrdersQuery } from '@/api/order-api';
import { TabNavigation } from '@/components/tabs/tab-navigation';
import { OrderCard } from '@/features/order/components/order-card';
import { OrderStatus } from '@/interfaces';
import { ListSortDirection } from '@/models';
import { GET_ORDERS_ORDER_BY } from '@/models/request/order/get-orders-request';
import List from 'antd/es/list';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type OrderStatusFilter = 'all' | OrderStatus;
const orderStatusTabs: { id: OrderStatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: OrderStatus.Pending, label: 'Pending' },
  { id: OrderStatus.Processing, label: 'Processing' },
  { id: OrderStatus.Confirmed, label: 'Confirmed' },
  { id: OrderStatus.ReadyForShipment, label: 'Ready for shipment' },
  { id: OrderStatus.Delivered, label: 'Delivered' },
  { id: OrderStatus.Completed, label: 'Completed' },
  { id: OrderStatus.Cancelled, label: 'Cancelled' },
];

export const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [statusesFilter, setStatusesFilter] = useState<OrderStatusFilter[]>([
    (searchParams.get('status') as OrderStatusFilter) ?? 'all',
  ]);

  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );

  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 10,
  );

  const getOrders = useGetOrdersQuery({
    // default
    orderBy: GET_ORDERS_ORDER_BY.orderDate,
    orderByDirection: ListSortDirection.Descending,

    statuses: statusesFilter.filter((status) => status !== 'all'),
    currentPage: page,
    limit,
  });
  const getOrdersData =
    getOrders.data && !getOrders.isError ? getOrders.data : undefined;
  const orders = getOrdersData?.result.collection;

  const handleChangePage = (page: number) => {
    setPage(page);
    setSearchParams(
      (prev) => {
        prev.set('page', page.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  const handleChangeLimit = (limit: number) => {
    setLimit(limit);
    setSearchParams(
      (prev) => {
        prev.set('limit', limit.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  const handleChangeStatus = (status: OrderStatusFilter) => {
    setStatusesFilter([status]);
    setSearchParams(
      (prev) => {
        prev.set('status', status.toString());
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <div className='flex flex-col gap-6 p-6 pt-0'>
      <div className='overflow-auto'>
        <TabNavigation
          activeTab={statusesFilter[0]}
          tabs={orderStatusTabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            onClick: () => {
              handleChangeStatus(tab.id);
              handleChangePage(1);
            },
          }))}
        />
      </div>
      <List
        className='[&_.ant-list-items]:flex [&_.ant-list-items]:flex-col [&_.ant-list-items]:gap-6'
        dataSource={orders ? orders : undefined}
        renderItem={(item) => <OrderCard orderHeader={item} />}
        pagination={{
          showSizeChanger: true,
          total: getOrdersData?.result.totalRow,
          size: 'small',
          current: page,
          pageSize: limit,
          align: 'end',
          onChange: (page, pageSize) => {
            handleChangePage(page);
            handleChangeLimit(pageSize);
          },
        }}
      />
    </div>
  );
};
