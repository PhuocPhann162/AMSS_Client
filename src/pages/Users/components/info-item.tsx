import { AParagraph } from '@/common/ui-common/atoms/a-paragraph/a-paragraph';
import type { AntdIconProps } from '@ant-design/icons/es/components/AntdIcon';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InfoItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: FC<AntdIconProps>;
  label: ReactNode;
  value?: ReactNode;
  action?: ReactNode;
}

export const InfoItem = ({
  icon: Icon,
  label,
  value,
  action,
  ...props
}: InfoItemProps) => (
  <div
    {...props}
    className={twMerge('flex items-center gap-3', props.className)}
  >
    <Icon className='rounded-lg bg-gray-950/20 p-2 text-white backdrop-blur-60 backdrop-saturate-180' />
    <div className='flex grow flex-col gap-1'>
      <p className='text-sm font-medium text-gray-400'>{label}</p>
      <AParagraph strong ellipsis={{ rows: 2, tooltip: value }}>
        {value || 'N/A'}
      </AParagraph>
    </div>
    {action}
  </div>
);
