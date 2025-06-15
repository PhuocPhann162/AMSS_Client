import Pagination from 'antd/es/pagination';
import { twMerge } from 'tailwind-merge';
import { ShowResult } from '@/components/pagination/show-result';
import Select from 'antd/es/select';

export interface PaginationCommonProps {
  page?: number;
  size?: number;
  total?: number;
  className?: string;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
}

export default function PaginationCommon(props: PaginationCommonProps) {
  const {
    onChange,
    page,
    size,
    total,
    pageSizeOptions = [10, 20, 50],
    className,
  } = props;

  const internalTotal = total ?? 0;
  const from = ((page ?? 0) - 1) * (size ?? 0) + 1;
  const to = Math.min(from + (size ?? 0) - 1, internalTotal);

  return (
    <div
      className={twMerge('flex w-full items-center justify-between', className)}
    >
      <ShowResult
        from={from}
        to={to}
        total={internalTotal}
        className='hidden md:block'
      />
      <Pagination
        total={internalTotal}
        current={page}
        pageSize={size}
        onChange={onChange}
        showSizeChanger={false}
      />
      <div className='flex items-center gap-2'>
        <p>Result per page</p>
        <Select
          options={pageSizeOptions.map((pageSize) => ({
            label: pageSize.toString(),
            value: pageSize,
          }))}
          popupMatchSelectWidth
          value={size ?? pageSizeOptions[0]}
          onChange={(value) => onChange?.(page ?? 1, value)}
        />
      </div>
    </div>
  );
}
