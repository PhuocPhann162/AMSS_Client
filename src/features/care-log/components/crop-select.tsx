import { useGetCropsQuery } from '@/api';
import type { cropModel } from '@/interfaces';
import { Select, type SelectProps } from 'antd';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Value = cropModel['id'];

export type CropSelectProps = Omit<SelectProps<Value>, 'options'>;

export const CropSelect = (props: CropSelectProps) => {
  const [search, setSearch] = useState('');

  const debounced = useDebouncedCallback<
    NonNullable<CropSelectProps['onSearch']>
  >((value) => {
    setSearch(value);
  }, 300);

  const getCrops = useGetCropsQuery({
    search,
    limit: 10,
  });

  const getCropsData =
    getCrops.data && !getCrops.isError ? getCrops.data : undefined;

  return (
    <Select<Value>
      loading={getCrops.isFetching}
      placeholder='Select Crop'
      showSearch
      onSearch={(value) => {
        debounced(value);
      }}
      filterOption={false}
      {...props}
      options={getCropsData?.result.collection?.map((crop) => ({
        value: crop.id,
        label: crop.name,
      }))}
    />
  );
};
