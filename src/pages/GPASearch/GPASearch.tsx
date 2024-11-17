import { useMemo, useState } from 'react';
import { ImportIcon, SearchIcon } from '~/components/Icon';
import { Breadcrumb } from '~/components/UI';
import { inputWordTypeAnalysis } from '~/helper/vnlpServerAnalysis';
import Select from 'react-select';
import vnlpAnalysisModel from '~/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST } from '~/constants/sentenceInput';
import { OptionType } from '~/interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '~/components/Page/GPASearch/Banner';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { motion } from 'framer-motion';
import { getScrollAnimation } from '~/helper';
import { LANGUAGE } from '~/constants/languages';

interface ArrayObjectSelectState {
  selectedOption: OptionType | null;
}

export const GPASearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<ArrayObjectSelectState>({
    selectedOption: null
  });
  const [vnlpList, setVnlpList] = useState<vnlpAnalysisModel[]>();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const handleSearch = async () => {
    const response: vnlpAnalysisModel[] = await inputWordTypeAnalysis(filters.selectedOption!.label, LANGUAGE.EN);
    if (response) {
      setVnlpList(response);
    }
  };

  return (
    <div>
      <Breadcrumb pageParent='GPA' pageName='Social Metrics' />
      <div className='bg-white min-h-screen'>
        <Banner />
        <ScrollAnimationWrapper>
          <motion.div variants={scrollAnimation} className='flex flex-col w-full gap-4 py-25 mx-10'>
            <div className='flex flex-col gap-4 w-full max-w-md'>
              <button
                className='flex items-center justify-center px-4 py-2 text-sm tracking-wide shadow-lg text-black font-bold transition-colors duration-200 bg-res-pending rounded-lg shrink-0 sm:w-auto hover:bg-res-refunded hover:shadow-yellow max-w-40'
                onClick={handleSearch}
              >
                <span>Search</span>
                <SearchIcon />
              </button>
              <Select
                value={filters.selectedOption}
                onChange={(option: OptionType | null) => {
                  setFilters({ selectedOption: option ?? null });
                }}
                getOptionLabel={(option: OptionType) => option.label}
                getOptionValue={(option: OptionType) => option.value}
                options={SENTENCE_LIST}
                isClearable={true}
                className='font-rubik'
              />
            </div>
            <div className='bg-white shadow-md rounded-lg max-w-md'>
              <div className='overflow-y-auto max-h-80 overflow-x-hidden'>
                <table className='table table-zebra custom-zebra text-center'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th className='text-brown'>Position</th>
                      <th className='text-brown'>Word</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vnlpList?.map((item: vnlpAnalysisModel, index: number) => (
                      <tr key={item.word}>
                        <th>{index}</th>
                        <td>{item.pos}</td>
                        <td>{item.word}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};
