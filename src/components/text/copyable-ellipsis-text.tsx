import { EllipsisText } from '@/components/text/ellipsis-text';
import { Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const [copied, setCopied] = useState(false);

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearCopyTimerRef = () => {
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      clearCopyTimerRef();
    };
  }, []);

  const textToCopy =
    typeof text === 'string'
      ? text
      : typeof children === 'string'
        ? children
        : undefined;

  return (
    <Tooltip
      title={textToCopy ? (copied ? 'Copied' : 'Copy') : undefined}
      destroyOnHidden
    >
      <EllipsisText
        ellipsis={true}
        onClick={() => {
          clearCopyTimerRef();

          if (typeof textToCopy === 'string') {
            copy(textToCopy);
          }

          setCopied(true);
          copyTimerRef.current = setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className={twMerge('cursor-pointer hover:underline', className)}
      >
        {children}
      </EllipsisText>
    </Tooltip>
  );
};
