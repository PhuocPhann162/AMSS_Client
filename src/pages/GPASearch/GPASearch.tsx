import { useEffect, useMemo, useRef, useState } from 'react';
import { SearchIcon } from '@/components/Icon';
import { Breadcrumb } from '@/components/UI';
import { inputWordTypeAnalysis } from '@/helper/vnlpServerAnalysis';
import Select, { MultiValue } from 'react-select';
import vnlpAnalysisModel from '@/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST } from '@/constants/sentenceInput';
import { farmModel, fieldModel, OptionType, socialMetricModel } from '@/interfaces';
import Banner from '@/components/Page/GPASearch/Banner';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { motion } from 'framer-motion';
import {
  farmDescriptionItems,
  fieldDescriptionItems,
  getScrollAnimation,
  locationDescriptionItems,
  toastNotify
} from '@/helper';
import { LANGUAGE } from '@/constants/languages';
import { SocialMetricLineChart } from '@/components/UI/Chart/SocialMetricLineChart';
import { useGetAllSocialMetricsQuery } from '@/api/socialMetricApi';
import { findProvinceCode } from '@/helper/findProvinceCodeWithVnlp';
import { MapBox } from '@/components/Page/Maps';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '@/api/fieldApi';
import { useGetFarmByIdQuery } from '@/api/farmApi';
import {} from '@/common';
import { ACard, ADescriptions } from '@/common/ui-common';
import { SocialMetricBarChart } from '@/components/UI/Chart/SocialMetricBarChart';

export const GPASearch = () => {
  const searchSectionRef = useRef(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [sentenceFilters, setFilters] = useState<OptionType[]>([]);
  const [provinceAnalysis, setProvinceAnalysis] = useState('');
  const [vnlpList, setVnlpList] = useState<vnlpAnalysisModel[]>();
  const [socialMetrics, setSocialMetrics] = useState<socialMetricModel[]>([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [landValue, setLandValue] = useState<(farmModel & fieldModel) | null>(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const { data, isLoading } = useGetAllSocialMetricsQuery(
    { ProvinceCode: provinceAnalysis, SeriesCodes: sentenceFilters.map((s) => s.value) },
    {
      skip: !provinceAnalysis || sentenceFilters.length == 0 || !isSearchClicked
    }
  );

  const { data: dataFarm, isLoading: isLoadingFarm } = useGetFarmByIdQuery(id, {
    skip: !type || type === '1'
  });

  const { data: dataField, isLoading: isLoadingField } = useGetFieldByIdQuery(id, {
    skip: !type || type === '0'
  });

  const handleSearch = async () => {
    if (!sentenceFilters.length) {
      toastNotify('Please select at least one filter', 'info');
      return;
    }

    setIsSearchClicked(true);
    const response: vnlpAnalysisModel[] = await inputWordTypeAnalysis(sentenceFilters[0].label, LANGUAGE.EN);
    if (response) {
      setVnlpList(response);
      const code = findProvinceCode(response);
      setProvinceAnalysis(code ?? '');
    }
  };

  const landItems = useMemo(() => {
    if (!landValue) return [];
    if (type === '0') {
      return farmDescriptionItems(landValue);
    } else {
      return fieldDescriptionItems(landValue);
    }
  }, [landValue, type]);

  const locationItems = useMemo(() => {
    if (!landValue) return [];
    return landValue.location ? locationDescriptionItems(landValue.location) : [];
  }, [landValue]);

  const handleMultiSelectChange = (selectedOptions: MultiValue<OptionType>) => {
    const mutableOptions = [...selectedOptions];
    setFilters(mutableOptions);
  };

  useEffect(() => {
    if (data) {
      setSocialMetrics(data.result);
      setIsSearchClicked(false);
    }
  }, [data]);

  useEffect(() => {
    if (dataFarm) {
      setLandValue(dataFarm.result);
    }
    if (dataField) {
      setLandValue(dataField.result);
    }
  }, [dataFarm, dataField]);

  return (
    <div>
      <Breadcrumb pageParent='GPA' pageName='Social Metrics' />
      <div className='min-h-screen pb-10'>
        <Banner searchSectionRef={searchSectionRef} />
        <div>
          <div className='max-w-6xl py-10 my-10 mx-auto'>
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
        <div className='flex gap-3' ref={searchSectionRef}>
          <div className='w-1/2'>
            <ACard className='h-full' title={`${type === '0' ? 'Farm' : 'Field'} Information`}>
              <ADescriptions colon items={landItems} />
            </ACard>
          </div>
          <div className='w-1/2'>
            <ACard className='h-full' title='Location Infomation'>
              <ADescriptions colon items={locationItems} />
            </ACard>
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
                  isMulti
                  value={sentenceFilters}
                  onChange={handleMultiSelectChange}
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
                  <table className='table table-zebra custom-zebra text-center '>
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
                        <tr key={index}>
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
              <SocialMetricLineChart socialMetrics={socialMetrics} />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>

        <div className='mx-auto max-w-4xl px-2 py-8'>
          <SocialMetricBarChart socialMetrics={socialMetrics} />
        </div>
      </div>
    </div>
  );
};
