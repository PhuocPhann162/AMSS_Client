import {
  CARE_LOG_TYPE_LABEL,
  type CareLogType,
} from '@/interfaces/care-log/care-log-type';
import { Select, type SelectProps } from 'antd';

type Value = CareLogType;

export type TypeSelectProps = Omit<SelectProps<Value>, 'options'>;

export const TypeSelect = (props: TypeSelectProps) => {
  return (
    <Select<Value>
      placeholder='Select Care log type'
      {...props}
      options={Object.entries(CARE_LOG_TYPE_LABEL).map(([value, label]) => ({
        value,
        label,
      }))}
    />
  );
};
