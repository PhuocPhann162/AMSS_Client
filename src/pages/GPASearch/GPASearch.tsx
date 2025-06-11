import { useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumb } from '@/components/UI';
import { inputWordTypeAnalysis } from '@/helper/vnlpServerAnalysis';
import Select, { MultiValue } from 'react-select';
import vnlpAnalysisModel from '@/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST } from '@/constants/sentenceInput';
import {
  farmModel,
  fieldModel,
  OptionType,
  socialMetricModel,
} from '@/interfaces';
import Banner from '@/components/Page/GPASearch/Banner';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { motion } from 'framer-motion';
import {
  farmDescriptionItems,
  fieldDescriptionItems,
  getScrollAnimation,
  locationDescriptionItems,
  toastNotify,
} from '@/helper';
import { LANGUAGE } from '@/constants/languages';
import { SocialMetricLineChart } from '@/components/UI/Chart/SocialMetricLineChart';
import { useGetAllSocialMetricsQuery } from '@/api';
import { findProvinceCode } from '@/helper/findProvinceCodeWithVnlp';
import { MapBox } from '@/components/Page/Maps';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '@/api';
import { useGetFarmByIdQuery } from '@/api';
import {} from '@/common';
import { AButton, ACard, ADescriptions } from '@/common/ui-common';
import { SocialMetricBarChart } from '@/components/UI/Chart/SocialMetricBarChart';
import { FaSearch } from 'react-icons/fa';
import { Spin } from 'antd';

export const GPASearch = () => {
  const searchSectionRef = useRef(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [sentenceFilters, setFilters] = useState<OptionType[]>([]);
  const [provinceAnalysis, setProvinceAnalysis] = useState('');
  const [vnlpList, setVnlpList] = useState<{
    [key: string]: vnlpAnalysisModel[];
  }>({});
  const [socialMetrics, setSocialMetrics] = useState<socialMetricModel[]>([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [landValue, setLandValue] = useState<(farmModel & fieldModel) | null>(
    null,
  );
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isSearching, setIsSearching] = useState(false);

  const { data } = useGetAllSocialMetricsQuery(
    {
      ProvinceCode: provinceAnalysis,
      SeriesCodes: sentenceFilters.map((s) => s.value),
    },
    {
      skip:
        !provinceAnalysis || sentenceFilters.length === 0 || !isSearchClicked,
    },
  );

  const { data: dataFarm } = useGetFarmByIdQuery(id, {
    skip: !type || type === '1',
  });

  const { data: dataField } = useGetFieldByIdQuery(id, {
    skip: !type || type === '0',
  });

  const handleSearch = async () => {
    if (!sentenceFilters.length) {
      toastNotify('Please select at least one filter', 'info');
      return;
    }

    setIsSearching(true);
    setIsSearchClicked(true);
    try {
      const newVnlpList: { [key: string]: vnlpAnalysisModel[] } = {};
      let provinceCode = '';

      // Analyze each selected option
      for (const filter of sentenceFilters) {
        const response: vnlpAnalysisModel[] = await inputWordTypeAnalysis(
          filter.label,
          LANGUAGE.EN,
        );
        if (response) {
          newVnlpList[filter.value] = response;
          // Use the first valid province code found
          if (!provinceCode) {
            provinceCode = findProvinceCode(response) ?? '';
          }
        }
      }

      setVnlpList(newVnlpList);
      setProvinceAnalysis(provinceCode);
    } catch {
      toastNotify('Error occurred while searching', 'error');
    } finally {
      setIsSearching(false);
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
    return landValue.location
      ? locationDescriptionItems(landValue.location)
      : [];
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
          <div className='mx-auto my-10 max-w-6xl py-10'>
            <ScrollAnimationWrapper>
              <motion.div variants={scrollAnimation}>
                <div className='mockup-window rounded-md bg-gradient-to-r from-white to-brown shadow-xl'>
                  <div className='flex justify-center bg-white px-4 py-4'>
                    <MapBox />
                  </div>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className='flex gap-3' ref={searchSectionRef}>
          <div className='w-1/2'>
            <ACard
              className='h-full'
              title={`${type === '0' ? 'Farm' : 'Field'} Information`}
            >
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
            <motion.div
              variants={scrollAnimation}
              className='ml-4 flex w-full max-w-md flex-col gap-4'
            >
              <div className='flex w-full flex-col gap-4'>
                <AButton
                  variant='solid'
                  color='lime'
                  onClick={handleSearch}
                  disabled={isSearching}
                  className='flex items-center justify-center gap-2'
                >
                  {isSearching ? (
                    <div className='flex items-center gap-1'>
                      <Spin size='small' />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <FaSearch />
                      <span>Search</span>
                    </div>
                  )}
                </AButton>
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
                  isDisabled={isSearching}
                />
              </div>
              <div className='max-w-md rounded-lg bg-white shadow-md'>
                <div className='max-h-80 overflow-y-auto overflow-x-hidden p-4'>
                  <div className='flex flex-col gap-4'>
                    {Object.entries(vnlpList).map(
                      ([key, items], groupIndex) => (
                        <div key={key} className='flex flex-col gap-2'>
                          <div className='font-semibold text-brown'>
                            Analysis for:{' '}
                            {
                              sentenceFilters.find((f) => f.value === key)
                                ?.label
                            }
                          </div>
                          {items.map(
                            (item: vnlpAnalysisModel, index: number) => (
                              <div
                                key={`${groupIndex}-${index}`}
                                className='flex items-center gap-4 rounded-lg border border-gray-200 p-3 hover:bg-gray-50'
                              >
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-brown text-white'>
                                  {index + 1}
                                </div>
                                <div className='flex flex-1 flex-col gap-1'>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-semibold text-brown'>
                                      Position:
                                    </span>
                                    <span>{item.pos}</span>
                                  </div>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-semibold text-brown'>
                                      Word:
                                    </span>
                                    <span>{item.word}</span>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={scrollAnimation} className='w-full'>
              <SocialMetricLineChart socialMetrics={socialMetrics} />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>

        <div className='mx-auto w-full px-2'></div>
        <SocialMetricBarChart socialMetrics={socialMetrics} />
      </div>
    </div>
  );
};
