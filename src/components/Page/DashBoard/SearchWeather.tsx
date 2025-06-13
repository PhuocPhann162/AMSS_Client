import { ChangeEvent } from 'react';

import { optionType } from '@/interfaces';
import { Suggestions } from '../Weather';
import { AButton } from '@/common/ui-common';
import Input from 'antd/es/input';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const SearchWeather = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) => (
  <section>
    <div className='relative flex gap-2'>
      <Input value={term} onChange={onInputChange} />

      <Suggestions options={options} onSelect={onOptionSelect} />

      <AButton variant='solid' color='cyan' onClick={onSubmit} className='w-32'>
        Search City
      </AButton>
    </div>
  </section>
);

export default SearchWeather;
