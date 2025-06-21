import { forwardRef } from 'react';
import type { GetRef } from 'antd/es/_util/type';
import type { TooltipProps } from 'antd/es/tooltip';
import type { TextProps } from 'antd/es/typography/Text';
import Text from 'antd/es/typography/Text';
import { twMerge } from 'tailwind-merge';

export type EllipsisTextProps = TextProps & {
  tooltipTitle?: TooltipProps['title'];
};

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
                        destroyTooltipOnHide: true,
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
