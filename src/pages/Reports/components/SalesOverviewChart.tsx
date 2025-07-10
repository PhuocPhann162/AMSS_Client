import { useState, useMemo } from 'react';
import { Card, Radio, Spin, Select } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetRevenueQuery } from '@/api/report-api';
import dayjs from 'dayjs';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const getCurrentYear = () => dayjs().year();
const getCurrentMonth = () => dayjs().month() + 1;

const revenueTypeOptions = [
  { label: 'Daily Revenue', value: 'daily' },
  { label: 'Monthly Revenue', value: 'monthly' },
  { label: 'Yearly Revenue', value: 'yearly' },
];

const getYearOptions = (start = 2020) => {
  const current = getCurrentYear();
  return Array.from({ length: current - start + 1 }, (_, i) => ({
    label: `${start + i}`,
    value: start + i,
  }));
};

const getMonthOptions = () =>
  Array.from({ length: 12 }, (_, i) => ({
    label: `Tháng ${i + 1}`,
    value: i + 1,
  }));

// ---

type RevenueType = 'daily' | 'monthly' | 'yearly';

export const SalesOverviewChart = () => {
  const [revenueType, setRevenueType] = useState<RevenueType>('daily');
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [startYear, setStartYear] = useState(getCurrentYear() - 4);
  const [endYear, setEndYear] = useState(getCurrentYear());

  // API params tuỳ theo loại
  const apiParams = useMemo(() => {
    if (revenueType === 'daily') {
      return { type: 'daily', year: selectedYear, month: selectedMonth };
    }
    if (revenueType === 'monthly') {
      return { type: 'monthly', year: selectedYear };
    }
    return { type: 'yearly', year: startYear, endYear };
  }, [revenueType, selectedYear, selectedMonth, startYear, endYear]);

  const { data, isLoading, isError } = useGetRevenueQuery(apiParams as any);

  // Chart labels tuỳ loại
  const labels = useMemo(() => {
    if (revenueType === 'daily') {
      // Số ngày trong tháng
      const daysInMonth = dayjs(
        `${selectedYear}-${selectedMonth}-01`,
      ).daysInMonth();
      return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
    }
    if (revenueType === 'monthly') {
      return getMonthOptions().map((m) => m.label);
    }
    // yearly
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => `${startYear + i}`,
    );
  }, [revenueType, selectedYear, selectedMonth, startYear, endYear]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: data?.result?.revenueData || [],
        backgroundColor: '#34d399',
        borderRadius: 6,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
    },
  };

  // --- UI chọn filter ---
  const renderFilters = () => {
    if (revenueType === 'daily') {
      return (
        <div className='flex gap-2'>
          <Select
            aria-label='Chọn năm'
            value={selectedYear}
            onChange={setSelectedYear}
            options={getYearOptions(2020)}
            className='w-24'
          />
          <Select
            aria-label='Chọn tháng'
            value={selectedMonth}
            onChange={setSelectedMonth}
            options={getMonthOptions()}
            className='w-28'
          />
        </div>
      );
    }
    if (revenueType === 'monthly') {
      return (
        <Select
          aria-label='Chọn năm'
          value={selectedYear}
          onChange={setSelectedYear}
          options={getYearOptions(2020)}
          className='w-24'
        />
      );
    }
    // yearly
    return (
      <div className='flex gap-2'>
        <Select
          aria-label='Năm bắt đầu'
          value={startYear}
          onChange={setStartYear}
          options={getYearOptions(2020)}
          className='w-24'
        />
        <Select
          aria-label='Năm kết thúc'
          value={endYear}
          onChange={setEndYear}
          options={getYearOptions(2020).filter((y) => y.value >= startYear)}
          className='w-24'
        />
      </div>
    );
  };

  return (
    <Card
      className='h-full rounded-lg bg-white shadow'
      title={<span className='text-lg font-semibold'>Revenue Data</span>}
      extra={
        <div className='flex flex-col items-end gap-2 md:flex-row md:items-center'>
          <Radio.Group
            options={revenueTypeOptions}
            onChange={(e) => setRevenueType(e.target.value)}
            value={revenueType}
            optionType='button'
            buttonStyle='solid'
            aria-label='Select revenue type'
          />
          {renderFilters()}
        </div>
      }
    >
      <div className='flex h-72 items-center justify-center'>
        {isLoading ? (
          <Spin size='large' />
        ) : isError ? (
          <span className='text-red-500'>Failed to load revenue data.</span>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </Card>
  );
};

export default SalesOverviewChart;
