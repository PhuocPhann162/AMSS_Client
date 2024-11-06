import { useState } from 'react';
import { ImportIcon, SearchIcon } from '~/components/Icon';
import { Breadcrumb } from '~/components/UI';
import { inputWordTypeAnalysis } from '~/helper/vnlpServerAnalysis';
import Select from 'react-select';
import vnlpAnalysisModel from '~/interfaces/vnlpAnalysisModel';
import { SENTENCE_LIST } from '~/constants/sentenceInput';
import { OptionType } from '~/interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const handleSearch = async () => {
    const response: vnlpAnalysisModel[] = await inputWordTypeAnalysis(filters.selectedOption!.label);
    if (response) {
      setVnlpList(response);
    }
  };

  return (
    <div>
      <Breadcrumb pageParent='GPA' pageName='Social Metrics' />
      <div className='p-10'>
        <div className='flex justify-end items-center gap-4 w-full'>
          <button
            className='flex items-center justify-center px-4 py-2 text-sm tracking-wide shadow-lg text-white transition-colors duration-200 bg-brown rounded-lg shrink-0 sm:w-auto hover:bg-yellow-800 hover:shadow-brown max-w-40'
            onClick={() => navigate(`/app/gpa-search/import-data`)}
          >
            <span>Import Data</span>
            <ImportIcon />
          </button>
        </div>
      </div>
      <div className='flex justify-center gap-4 w-full'>
        <div className='flex flex-col gap-4 w-full max-w-md'>
          <button
            className='flex items-center justify-center px-4 py-2 text-sm tracking-wide shadow-lg text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-600 hover:shadow-green max-w-40'
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
          />
        </div>
        <div className='bg-white shadow-md rounded-lg'>
          <div className='overflow-y-auto max-h-80 overflow-x-hidden'>
            <table className='table table-zebra custom-zebra text-center'>
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className='w-20'>Position</th>
                  <th className='w-40'>Word</th>
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
      </div>
    </div>
  );
};
