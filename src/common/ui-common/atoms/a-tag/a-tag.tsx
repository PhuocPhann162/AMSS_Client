import { type GetRef } from 'antd/es/_util/type';
import Tag, { type TagProps } from 'antd/es/tag';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ATagProps = TagProps;

export type ATagRef = GetRef<typeof Tag>;

export const ATag = forwardRef<ATagRef, ATagProps>((props, ref) => {
  return (
    <Tag
      ref={ref}
      bordered={false}
      {...props}
      className={twMerge(
        'me-[initial] max-w-fit px-3 py-1 font-bold',
        props.className,
      )}
    />
  );
});
ATag.displayName = 'ATag';
