import { ASelect, ASelectProps } from '@/common/ui-common';
import { Country } from '@/interfaces';
import { RootState } from '@/storage/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const SelectCountry = (props: ASelectProps) => {
  const countries: Country[] = useSelector(
    (state: RootState) => state.countryStore,
  );
  const [options, setOptions] = useState<Country[]>([]);

  useEffect(() => {
    setOptions(countries);
  }, [countries]);

  return (
    <ASelect
      {...props}
      options={options.slice().sort((a, b) => {
        const NameA = a.name ?? '';
        const NameB = b.name ?? '';
        return NameA.localeCompare(NameB);
      })}
      fieldNames={{ label: 'name', value: 'value' }}
      optionFilterProp='name'
      onChange={(e, ops) => {
        props.onChange!(e, ops);
      }}
    />
  );
};
