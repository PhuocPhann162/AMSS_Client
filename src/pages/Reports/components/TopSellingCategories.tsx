import { Card, Progress, Avatar, List } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import type { FC } from 'react';

const categories = [
  { name: 'Clothing', percent: 25.4, value: 125875, color: 'blue' },
  { name: 'Electronics', percent: 20.5, value: 98500, color: 'orange' },
  { name: 'Grocery', percent: 18.7, value: 72757, color: 'green' },
  { name: 'Accessories', percent: 15.6, value: 60725, color: 'purple' },
  { name: 'Others', percent: 19.8, value: 91834, color: 'pink' },
];

export const TopSellingCategories: FC = () => (
  <Card
    className='h-full rounded-lg shadow'
    title={<span className='font-semibold'>Top Selling Categories</span>}
    extra={
      <span className='cursor-pointer text-xs text-gray-400'>Sort by</span>
    }
  >
    <List
      itemLayout='horizontal'
      dataSource={categories}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                icon={<ShoppingOutlined />}
                className={`bg-${item.color}-100 text-${item.color}-500`}
              />
            }
            title={
              <span className='font-medium text-gray-700'>{item.name}</span>
            }
            description={
              <Progress
                percent={item.percent}
                size='small'
                strokeColor={item.color}
                showInfo={false}
              />
            }
          />
          <span className='text-sm font-semibold text-gray-600'>
            {item.value.toLocaleString()}
          </span>
        </List.Item>
      )}
    />
  </Card>
);

export default TopSellingCategories;
