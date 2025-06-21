import type { ListProps } from 'antd/es/list';
import List from 'antd/es/list';
import { twMerge } from 'tailwind-merge';

export type AListProps<T = unknown> = ListProps<T>;

export const AList = <T = unknown,>(props: AListProps<T>) => {
  return (
    <List
      {...props}
      className={twMerge(
        '[&_.ant-spin-container.ant-spin-blur]:after:bg-[initial]',
        props.className,
      )}
    />
  );
};

AList.Item = List.Item;
