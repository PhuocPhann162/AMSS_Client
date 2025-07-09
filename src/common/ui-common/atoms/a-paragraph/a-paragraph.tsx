import { type GetRef, Typography } from 'antd';
import type { ParagraphProps } from 'antd/es/typography/Paragraph';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AParagraphProps = ParagraphProps;

export type AParagraphRef = GetRef<typeof Typography.Paragraph>;

export const AParagraph = forwardRef<AParagraphRef, AParagraphProps>(
  (props, ref) => {
    return (
      <Typography.Paragraph
        ref={ref}
        {...props}
        rootClassName={twMerge(
          '[&.ant-typography]:mb-[initial]',
          props.rootClassName,
        )}
      />
    );
  },
);
AParagraph.displayName = 'AParagraph';
