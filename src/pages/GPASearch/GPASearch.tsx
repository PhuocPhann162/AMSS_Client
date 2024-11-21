import { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from '~/components/Icon';
import { Breadcrumb } from '~/components/UI';
import { inputWordTypeAnalysis } from '~/helper/vnlpServerAnalysis';
import Select from 'react-select';
import vnlpAnalysisModel from '~/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST } from '~/constants/sentenceInput';
import { OptionType, socialMetricModel, socialYearModel } from '~/interfaces';
import { useNavigate } from 'react-router-dom';
import Banner from '~/components/Page/GPASearch/Banner';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { motion } from 'framer-motion';
import { getScrollAnimation } from '~/helper';
import { LANGUAGE } from '~/constants/languages';
import { SocialMetricLineChart } from '~/components/UI/Chart/SocialMetricLineChart';
import { useGetAllSocialMetricsQuery } from '~/api/socialMetricApi';
import { findProvinceCode } from '~/helper/findProvinceCodeWithVnlp';
import { SocialMetricDataChart } from '~/models';
import { MapBox } from '~/components/Page/Maps';
import { SocialMetricBarChart } from '~/components/UI/Chart/SocialMetricBarChart';

interface ArrayObjectSelectState {
  selectedOption: OptionType | null;
}

export const GPASearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ArrayObjectSelectState>({
    selectedOption: null
  });
  const [provinceAnalysis, setProvinceAnalysis] = useState('');
  const [vnlpList, setVnlpList] = useState<vnlpAnalysisModel[]>();
  const [socialMetric, setSocialMetric] = useState<socialMetricModel>();
  const [socialYearData, setSocialYearData] = useState<SocialMetricDataChart[]>([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const { data, isLoading } = useGetAllSocialMetricsQuery(
    { ProvinceCode: provinceAnalysis, SeriesCode: filters.selectedOption?.value },
    {
      skip: !provinceAnalysis || !filters.selectedOption?.value || !isSearchClicked
    }
  );

  const handleSearch = async () => {
    setIsSearchClicked(true);
    const response: vnlpAnalysisModel[] = await inputWordTypeAnalysis(filters.selectedOption!.label, LANGUAGE.EN);
    if (response) {
      setVnlpList(response);
      const code = findProvinceCode(response);
      setProvinceAnalysis(code ?? '');
    }
  };

  useEffect(() => {
    if (data) {
      setSocialMetric(data.result);
      setIsSearchClicked(false);
    }
  }, [data]);

  useEffect(() => {
    if (socialMetric?.socialYears && Array.isArray(socialMetric.socialYears)) {
      const yearData = socialMetric.socialYears.map(({ year, value }: socialYearModel) => ({
        year,
        value
      }));
      setSocialYearData(yearData);
    }
  }, [socialMetric]);

  return (
    <div>
      <Breadcrumb pageParent='GPA' pageName='Social Metrics' />
      <div className='bg-white min-h-screen'>
        <Banner />
        <div>
          <div className='max-w-6xl py-10 mx-auto'>
            <ScrollAnimationWrapper>
              <motion.div variants={scrollAnimation}>
                <div className='mockup-window bg-gradient-to-r from-white to-brown shadow-xl rounded-md'>
                  <div className='flex justify-center px-4 py-4 bg-white'>
                    <MapBox />
                  </div>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className='w-full py-20'>
          <ScrollAnimationWrapper className='flex w-full gap-8'>
            <motion.div variants={scrollAnimation} className='flex flex-col w-full max-w-md gap-4 ml-4'>
              <div className='flex flex-col gap-4 w-full'>
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
                  placeholder='Select your sentence...'
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
            <motion.div variants={scrollAnimation} className='w-full'>
              <SocialMetricLineChart socialYears={socialYearData} socialMetric={socialMetric} />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
        <ScrollAnimationWrapper>
          <motion.div variants={scrollAnimation} className='mx-4'>
            <SocialMetricBarChart socialYears={socialYearData} socialMetric={socialMetric} />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};
