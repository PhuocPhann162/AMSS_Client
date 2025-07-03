import { Typography, type GetRef, type TooltipProps } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type EllipsisTextProps = TextProps & {
  tooltipTitle?: TooltipProps['title'];
};

const { Text } = Typography;

export type EllipsisTextRef = GetRef<typeof Text>;

export const EllipsisText = forwardRef<EllipsisTextRef, EllipsisTextProps>(
  ({ tooltipTitle, ...props }, ref) => {
    return (
      <Text
        {...props}
        ellipsis={
          typeof props.ellipsis === 'boolean'
            ? props.ellipsis
            : {
                ...props.ellipsis,
                tooltip:
                  typeof props.ellipsis?.tooltip === 'object' ||
                  typeof props.ellipsis?.tooltip === 'undefined'
                    ? {
                        destroyOnHidden: true,
                        title: tooltipTitle ?? props.children,
                        ...props.ellipsis?.tooltip,
                      }
                    : props.ellipsis?.tooltip,
              }
        }
        className={twMerge('duration-500 ease-out', props.className)}
        ref={ref}
      />
    );
  },
);
EllipsisText.displayName = 'EllipsisText';
