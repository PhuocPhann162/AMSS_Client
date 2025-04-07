import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Tag, { type TagProps } from 'antd/es/tag';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ATagProps extends TagProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ATagRef extends GetRef<typeof Tag> {}

export const ATag = forwardRef<ATagRef, ATagProps>(
  ({ children, className, bordered = false, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        bordered={bordered}
        className={cn('px-3 py-1', className)}
        {...props}
      >
        <span className='font-bold'>{children}</span>
      </Tag>
    );
  },
);
ATag.displayName = 'ATag';
