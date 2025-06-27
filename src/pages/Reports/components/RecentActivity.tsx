import { Card, List } from 'antd';
import type { FC } from 'react';

const activities = [
  {
    time: '12 Hrs',
    desc: 'John Doe updated the product description for Widget X.',
  },
  {
    time: '4:32pm',
    desc: 'Jane Smith added a new user with username janesmith89.',
  },
  {
    time: '11:56am',
    desc: 'Michael Brown changed the status of order #123456.',
  },
  {
    time: '9:27am',
    desc: 'David Wilson added John Smith to academy group this day.',
  },
  {
    time: '8:56pm',
    desc: 'Robert Jackson commented to the task Update website layout.',
  },
];

export const RecentActivity: FC = () => (
  <Card
    className='h-full rounded-lg shadow'
    title={<span className='font-semibold'>Recent Activity</span>}
  >
    <List
      dataSource={activities}
      renderItem={(item) => (
        <List.Item>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-400'>{item.time}</span>
            <span className='text-sm text-gray-700'>{item.desc}</span>
          </div>
        </List.Item>
      )}
    />
  </Card>
);

export default RecentActivity;
