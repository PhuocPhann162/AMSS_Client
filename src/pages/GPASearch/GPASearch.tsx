import { useEffect, useMemo, useRef, useState } from 'react';
import { inputWordTypeAnalysis } from '@/helper/vnlpServerAnalysis';
import Select, { MultiValue } from 'react-select';
import vnlpAnalysisModel from '@/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST_EN, SENTENCE_LIST_VI } from '@/constants/sentenceInput';

import {
  farmModel,
  fieldModel,
  OptionType,
  socialMetricModel,
} from '@/interfaces';
import Banner from '@/components/Page/GPASearch/Banner';
import { motion, useInView } from 'framer-motion';
import {
  farmDescriptionItems,
  fieldDescriptionItems,
  locationDescriptionItems,
  toastNotify,
} from '@/helper';
import { SocialMetricLineChart } from '@/components/UI/Chart/SocialMetricLineChart';
import { useGetAllSocialMetricsQuery } from '@/api';
import { findProvinceCode } from '@/helper/findProvinceCodeWithVnlp';
import { MapBox } from '@/components/Page/Maps';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '@/api';
import { useGetFarmByIdQuery } from '@/api';
import { AButton, ACard, ADescriptions } from '@/common/ui-common';
import { SocialMetricBarChart } from '@/components/UI/Chart/SocialMetricBarChart';
import { FaSearch, FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';
import { Spin, Typography } from 'antd';
import { LANGUAGE } from '@/constants/languages';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

export const GPASearch = () => {
  const searchSectionRef = useRef(null);
  const mapSectionRef = useRef(null);
  const analysisSectionRef = useRef(null);
  const metricsSectionRef = useRef(null);

  const isMapInView = useInView(mapSectionRef, { once: true });
  const isAnalysisInView = useInView(analysisSectionRef, { once: true });
  const isMetricsInView = useInView(metricsSectionRef, { once: true });

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
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'VI'>('EN');

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

  // Khi đổi ngôn ngữ, reset filter
  useEffect(() => {
    setFilters([]);
  }, [selectedLanguage]);

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
          selectedLanguage === 'EN' ? LANGUAGE.EN : LANGUAGE.VI,
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
    <div className='min-h-screen bg-white px-5'>
      {/* Hero Section */}
      <section className='relative'>
        <Banner searchSectionRef={searchSectionRef} />
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef}>
        <div className='container mx-auto px-4'>
          <motion.div
            initial='hidden'
            animate={isMapInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className='mb-12 text-center'
          >
            <Typography.Title
              level={2}
              className='mb-4 text-4xl font-bold text-gray-800'
            >
              Geographic Analysis
            </Typography.Title>
            <Typography.Paragraph className='mx-auto max-w-2xl text-lg text-gray-600'>
              Explore our interactive map to visualize and analyze geographic
              data across different regions
            </Typography.Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isMapInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5 }}
            className='mockup-window overflow-hidden rounded-xl'
          >
            <div className='flex justify-center bg-white p-4'>
              <MapBox />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial='hidden'
            animate={isMapInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className='mb-12 text-center'
          >
            <Typography.Title
              level={2}
              className='mb-4 text-4xl font-bold text-gray-800'
            >
              Detailed Information
            </Typography.Title>
            <Typography.Paragraph className='mx-auto max-w-2xl text-lg text-gray-600'>
              Comprehensive details about the selected location and its
              characteristics
            </Typography.Paragraph>
          </motion.div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate={isMapInView ? 'visible' : 'hidden'}
            >
              <ACard
                className='h-full shadow-lg transition-shadow duration-300 hover:shadow-xl'
                title={
                  <div className='flex items-center gap-2'>
                    <FaInfoCircle className='text-amber-950' />
                    <span>{`${type === '0' ? 'Farm' : 'Field'} Information`}</span>
                  </div>
                }
              >
                <ADescriptions colon items={landItems} />
              </ACard>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate={isMapInView ? 'visible' : 'hidden'}
            >
              <ACard
                className='h-full shadow-lg transition-shadow duration-300 hover:shadow-xl'
                title={
                  <div className='flex items-center gap-2'>
                    <FaMapMarkedAlt className='text-amber-950' />
                    <span>Location Information</span>
                  </div>
                }
              >
                <ADescriptions colon items={locationItems} />
              </ACard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section ref={metricsSectionRef} className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial='hidden'
            animate={isAnalysisInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className='mb-12 text-center'
          >
            <Typography.Title
              level={2}
              className='mb-4 text-4xl font-bold text-gray-800'
            >
              Advanced Analysis
            </Typography.Title>
            <Typography.Paragraph className='mx-auto max-w-2xl text-lg text-gray-600'>
              Perform detailed analysis using our powerful NLP-based search
              capabilities
            </Typography.Paragraph>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            animate={isAnalysisInView ? 'visible' : 'hidden'}
            className='space-y-6'
          >
            <div className='rounded-xl bg-white p-6 shadow-lg'>
              <div className='mb-4'>
                <Typography.Title
                  level={4}
                  className='mb-2 text-xl font-semibold text-gray-800'
                >
                  Search Criteria
                </Typography.Title>
                <Typography.Paragraph className='text-gray-600'>
                  Select one or more criteria to analyze
                </Typography.Paragraph>
              </div>
              {/* Language Selector */}
              <div className='mb-4 flex items-center gap-4'>
                <label
                  htmlFor='language-select'
                  className='font-medium text-gray-700'
                >
                  Language:
                </label>
                <select
                  id='language-select'
                  value={selectedLanguage}
                  onChange={(e) =>
                    setSelectedLanguage(e.target.value as 'EN' | 'VI')
                  }
                  className='rounded border px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-lime-500'
                  aria-label='Select language'
                >
                  <option value='EN'>English</option>
                  <option value='VI'>Vietnamese</option>
                </select>
              </div>
              <Select
                isMulti
                value={sentenceFilters}
                onChange={handleMultiSelectChange}
                placeholder='Select analysis criteria...'
                getOptionLabel={(option: OptionType) => option.label}
                getOptionValue={(option: OptionType) => option.value}
                options={
                  selectedLanguage === 'EN'
                    ? SENTENCE_LIST_EN
                    : SENTENCE_LIST_VI
                }
                isClearable={true}
                className='mb-4 font-rubik'
                isDisabled={isSearching}
              />

              <AButton
                variant='solid'
                color='lime'
                onClick={handleSearch}
                disabled={isSearching}
                className='flex h-12 w-full items-center justify-center gap-2 text-lg'
              >
                {isSearching ? (
                  <div className='flex items-center gap-2'>
                    <Spin size='small' />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <FaSearch />
                    <span>Start Analysis</span>
                  </div>
                )}
              </AButton>
            </div>

            {/* Analysis Results */}
            <div className='rounded-xl bg-white shadow-lg'>
              <div className='border-b border-gray-200 p-4'>
                <Typography.Title
                  level={4}
                  className='text-xl font-semibold text-gray-800'
                >
                  Analysis Results
                </Typography.Title>
              </div>
              <div className='max-h-[500px] overflow-y-auto p-4'>
                <div className='space-y-4'>
                  {Object.entries(vnlpList).map(([key, items], groupIndex) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIndex * 0.1 }}
                      className='space-y-2'
                    >
                      <div className='text-lg font-semibold text-amber-950'>
                        Analysis for:{' '}
                        {sentenceFilters.find((f) => f.value === key)?.label}
                      </div>
                      {items.map((item: vnlpAnalysisModel, index: number) => (
                        <motion.div
                          key={`${groupIndex}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className='flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50'
                        >
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 font-semibold text-white'>
                            {index + 1}
                          </div>
                          <div className='flex-1 space-y-1'>
                            <div className='flex items-center gap-2'>
                              <span className='font-semibold text-amber-950'>
                                Position:
                              </span>
                              <span>{item.pos}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='font-semibold text-amber-950'>
                                Word:
                              </span>
                              <span>{item.word}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section ref={analysisSectionRef} className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial='hidden'
            animate={isMetricsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className='mb-12 text-center'
          >
            <Typography.Title
              level={2}
              className='mb-4 text-4xl font-bold text-gray-800'
            >
              Social Metrics Overview
            </Typography.Title>
            <Typography.Paragraph className='mx-auto max-w-2xl text-lg text-gray-600'>
              Comprehensive visualization of social metrics and their trends
              over time
            </Typography.Paragraph>
          </motion.div>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {/* Left Column - Search and Analysis */}

            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate={isMetricsInView ? 'visible' : 'hidden'}
              className='rounded-xl bg-white p-6 shadow-lg'
            >
              <div className='mb-4'>
                <Typography.Title
                  level={4}
                  className='text-xl font-semibold text-gray-800'
                >
                  Comparative Analysis
                </Typography.Title>
                <Typography.Paragraph className='text-gray-600'>
                  Compare different metrics across selected criteria
                </Typography.Paragraph>
              </div>
              <SocialMetricBarChart socialMetrics={socialMetrics} />
            </motion.div>

            {/* Right Column - Line Chart */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              animate={isAnalysisInView ? 'visible' : 'hidden'}
              className='rounded-xl bg-white p-6 shadow-lg'
            >
              <div className='mb-4'>
                <Typography.Title
                  level={4}
                  className='text-xl font-semibold text-gray-800'
                >
                  Trend Analysis
                </Typography.Title>
                <Typography.Paragraph className='text-gray-600'>
                  View the trend of selected metrics over time
                </Typography.Paragraph>
              </div>
              <SocialMetricLineChart socialMetrics={socialMetrics} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
