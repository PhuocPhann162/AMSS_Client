import { useGetFieldsByCropQuery } from '@/api';
import type { fieldModel } from '@/interfaces';
import { Select, type SelectProps } from 'antd';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Value = fieldModel['id'];

export type FieldByCropSelectProps = Omit<SelectProps<Value>, 'options'> & {
  cropId: string;
};

export const FieldByCropSelect = ({
  cropId,
  ...props
}: FieldByCropSelectProps) => {
  const [search, setSearch] = useState('');

  const debounced = useDebouncedCallback<
    NonNullable<FieldByCropSelectProps['onSearch']>
  >((value) => {
    setSearch(value);
  }, 300);

  const getFieldsByCrop = useGetFieldsByCropQuery(
    {
      cropId,
      search,
      limit: 10,
    },
    {
      skip: !cropId,
    },
  );

  const getFieldsByCropData =
    getFieldsByCrop.data && !getFieldsByCrop.isError
      ? getFieldsByCrop.data
      : undefined;

  return (
    <Select<Value>
      showSearch
      filterOption={false}
      onSearch={(value) => {
        debounced(value);
      }}
      placeholder={'Select Field by Crop' + (cropId ? ` (${cropId})` : '')}
      loading={getFieldsByCrop.isFetching}
      {...props}
      options={getFieldsByCropData?.result.collection?.map((field) => ({
        value: field.id,
        label: field.name,
      }))}
    />
  );
};
