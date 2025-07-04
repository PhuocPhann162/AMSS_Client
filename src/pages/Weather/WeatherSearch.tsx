import { Forecast, Search } from '@/components/Page/Weather';
import { useForecast } from '@/hooks';

export const WeatherSearch = () => {
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange } =
    useForecast();

  return (
    <main className='flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400'>
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};
