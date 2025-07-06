import { EllipsisText } from '@/components/text/ellipsis-text';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoCopyOutline } from 'react-icons/io5';
import { Button } from 'antd';
import { FaCheck } from 'react-icons/fa6';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

export interface CopyableEllipsisTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
}

export const CopyableEllipsisText = ({
  text,
  children,
  className,
}: CopyableEllipsisTextProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const textToCopy =
    typeof text === 'string'
      ? text
      : typeof children === 'string'
        ? children
        : undefined;

  return (
    <div className={twMerge('flex gap-1', className)}>
      <EllipsisText ellipsis={{ tooltip: false }}>{children}</EllipsisText>
      <Button
        type={'text'}
        onClick={() => {
          if (typeof textToCopy === 'string') {
            copyToClipboard(textToCopy);
          }
        }}
        icon={
          isCopied ? <FaCheck className='text-green-700' /> : <IoCopyOutline />
        }
        size='small'
        className='shrink-0'
      />
    </div>
  );
};
