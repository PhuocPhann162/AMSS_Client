import { ASelect, ASelectProps } from '@/common/ui-common';
import { Country } from '@/interfaces';
import { RootState } from '@/storage/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
type CustomPhoneCode = Country & {
  phoneCodeLabel: string;
};
export const SelectPhoneCode = (props: ASelectProps) => {
  const { onChange, value, ...rest } = props;
  const countries: Country[] = useSelector(
    (state: RootState) => state.countryStore,
  );
  const [options, setOptions] = useState<CustomPhoneCode[]>([]);
  useEffect(() => {
    if (countries) {
      const splitData = countries.flatMap((x) =>
        x.phoneCode?.split(',').map((y) => ({
          name: x.name,
          phoneCode: y.trim(),
          phoneCodeLabel: `${y} (${x.name})`,
          value: x.value,
        })),
      );

      setOptions(splitData as CustomPhoneCode[]);
    }
  }, [countries]);

  return (
    <ASelect
      {...rest}
      options={options.slice().sort((a, b) => {
        const PhoneCodeA = a.phoneCode?.replace('+', '') ?? '';
        const PhoneCodeB = b.phoneCode?.replace('+', '') ?? '';
        return PhoneCodeA.localeCompare(PhoneCodeB);
      })}
      value={options.find((x) => x.phoneCode === value)?.phoneCodeLabel}
      fieldNames={{ value: 'phoneCodeLabel', label: 'phoneCodeLabel' }}
      optionFilterProp='phoneCodeLabel'
      onChange={(_, option) =>
        onChange && onChange((option as CustomPhoneCode)?.phoneCode, option)
      }
    />
  );
};
