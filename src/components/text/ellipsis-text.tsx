import type { GetRef } from 'antd/es/_util/type';
import type { TooltipProps } from 'antd/es/tooltip';
import Typography from 'antd/es/typography';
import type { TextProps } from 'antd/es/typography/Text';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const { Text } = Typography;

export type EllipsisTextProps = TextProps & {
  tooltipTile?: TooltipProps['title'];
};

export type EllipsisTextRef = GetRef<typeof Text>;

export const EllipsisText = forwardRef<EllipsisTextRef, EllipsisTextProps>(
  (props, ref) => {
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
                        title: props.tooltipTile ?? props.children,
                        ...props.ellipsis?.tooltip,
                      }
                    : props.ellipsis?.tooltip,
              }
        }
        className={twMerge('w-full', props.className)}
        ref={ref}
      />
    );
  },
);
EllipsisText.displayName = 'EllipsisText';
