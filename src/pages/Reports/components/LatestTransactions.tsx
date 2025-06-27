import { Card, List, Avatar } from 'antd';
import type { FC } from 'react';

const transactions = [
  { product: 'Swiftlids', price: 39.99, icon: '/public/avatar.png' },
  { product: 'CoryCloud Pillow', price: 119.95, icon: '/public/avatar.png' },
  { product: 'Aquqario Bottle', price: 39.99, icon: '/public/avatar.png' },
  { product: 'Glowlite Lamp', price: 28.45, icon: '/public/avatar.png' },
  { product: 'Bitvarinin', price: 26.45, icon: '/public/avatar.png' },
  { product: 'FitRack', price: 49.95, icon: '/public/avatar.png' },
];

export const LatestTransactions: FC = () => (
  <Card
    className='h-full rounded-lg shadow'
    title={<span className='font-semibold'>Latest Transactions</span>}
  >
    <List
      itemLayout='horizontal'
      dataSource={transactions}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.icon} alt={item.product} />}
            title={
              <span className='font-medium text-gray-700'>{item.product}</span>
            }
            description={
              <span className='text-xs text-gray-500'>
                ${item.price.toFixed(2)}
              </span>
            }
          />
        </List.Item>
      )}
    />
  </Card>
);

export default LatestTransactions;
