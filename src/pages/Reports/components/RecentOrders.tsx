import { Card, Table, Avatar, Tag } from 'antd';
import type { FC } from 'react';

const columns = [
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (text: string, record: any) => (
      <div className='flex items-center gap-2'>
        <Avatar src={record.avatar} alt={record.customer} />
        <span>{text}</span>
      </div>
    ),
  },
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (v: number) => `$${v.toFixed(2)}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (v: string) => (
      <Tag
        color={v === 'Success' ? 'green' : v === 'Pending' ? 'orange' : 'blue'}
      >
        {v}
      </Tag>
    ),
  },
  { title: 'Date Ordered', dataIndex: 'date', key: 'date' },
];

const data = [
  {
    customer: 'Elena Smith',
    avatar: '/public/avatar.png',
    product: 'All-Purpose Cleaner',
    quantity: 3,
    amount: 9.99,
    status: 'In Progress',
    date: '03 Sep 2024',
  },
  {
    customer: 'Nelson Gold',
    avatar: '/public/avatar.png',
    product: 'Kitchen Knife Set',
    quantity: 4,
    amount: 49.99,
    status: 'Pending',
    date: '26 Jul 2024',
  },
  {
    customer: 'Grace Mitchell',
    avatar: '/public/avatar.png',
    product: 'Velvet Throw Blanket',
    quantity: 2,
    amount: 29.99,
    status: 'Success',
    date: '12 May 2024',
  },
  {
    customer: 'Spencer Robin',
    avatar: '/public/avatar.png',
    product: 'Aromatherapy Diffuser',
    quantity: 4,
    amount: 19.99,
    status: 'Success',
    date: '15 Aug 2024',
  },
  {
    customer: 'Chloe Lewis',
    avatar: '/public/avatar.png',
    product: 'Insulated Water Bottle',
    quantity: 2,
    amount: 14.99,
    status: 'Pending',
    date: '10 Oct 2024',
  },
];

export const RecentOrders: FC = () => (
  <Card
    className='h-full rounded-lg shadow'
    title={<span className='font-semibold'>Recent Orders</span>}
  >
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey='customer'
      size='small'
    />
  </Card>
);

export default RecentOrders;
