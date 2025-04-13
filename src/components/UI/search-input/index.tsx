import { AInput } from '@/common/ui-common';
import { SearchOutlined } from '@ant-design/icons';
import { Form, FormProps } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';

type SearchInputProps = {
  placeholder?: string;
  onSearch: (searchValue: string) => void;
  className?: string;
};
type SearchValue = {
  value: string;
};
export const SearchInput = (props: SearchInputProps) => {
  const { placeholder, onSearch, className } = props;

  const [form] = Form.useForm<SearchValue>();
  const nameValue = Form.useWatch((values) => values.value || '', form);

  const onFinish: FormProps<SearchValue>['onFinish'] = (values) => {
    props.onSearch(values.value);
  };
  if (!nameValue) {
    props.onSearch('');
  }

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      onSearch(value);
    }, 500);
  }, [onSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = () => {
    const currentValue: string = (form.getFieldValue('value') as string) || '';
    debouncedSearch(currentValue);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ value: '' }}
      className={className}
    >
      <Form.Item<SearchValue> name='value'>
        <AInput
          className='w-full !rounded-md shadow-sm'
          prefix={<SearchOutlined />}
          onChange={handleChange}
          size='middle'
          allowClear={true}
          placeholder={placeholder}
        />
      </Form.Item>
    </Form>
  );
};
