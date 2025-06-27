import { Card, Typography, Button } from 'antd';
import type { FC } from 'react';

export const UpgradeCard: FC = () => (
  <Card
    className='h-full rounded-lg border-0 bg-gradient-to-r from-pink-100 to-blue-100 shadow'
    bordered={false}
  >
    <div className='flex h-full flex-col items-start justify-between gap-2'>
      <Typography.Title level={5} className='!mb-1 !text-pink-600'>
        Upgrade to get more
      </Typography.Title>
      <Typography.Paragraph className='!mb-2 text-xs text-gray-600'>
        Maximize sales insights. Optimize performance. Advance business with
        pro. <br />
        <span className='font-semibold text-blue-500'>Upgrade to Pro →</span>
      </Typography.Paragraph>
      <Button type='primary' className='border-0 bg-pink-500'>
        Upgrade Now
      </Button>
    </div>
  </Card>
);

export default UpgradeCard;
