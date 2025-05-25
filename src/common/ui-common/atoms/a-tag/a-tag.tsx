import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Tag, { type TagProps } from 'antd/es/tag';
import { forwardRef } from 'react';

export type ATagProps = TagProps;

export type ATagRef = GetRef<typeof Tag>;

export const ATag = forwardRef<ATagRef, ATagProps>(
  ({ className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        bordered={false}
        className={cn('max-w-fit px-3 py-1 font-bold', className)}
        {...props}
      />
    );
  },
);
ATag.displayName = 'ATag';
