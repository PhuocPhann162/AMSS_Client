import { useState, useEffect, ChangeEvent } from 'react';

import { forecastType, optionType } from '~/interfaces';
import { SD_BASE_WEATHER_URL } from '~/utils/SD';

const DEFAULT_CITY: optionType = { name: 'Ho Chi Minh', country: 'VN', lat: 10.762622, lon: 106.660172 };

const useForecast = () => {
  const [city, setCity] = useState<optionType>(DEFAULT_CITY);
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = async (term: string) => {
    fetch(
      `${SD_BASE_WEATHER_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${import.meta.env.VITE_APP_NAME}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log({ e }));
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  const getForecast = (data: optionType) => {
    fetch(
      `${SD_BASE_WEATHER_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${import.meta.env.VITE_APP_NAME}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list
        };

        setForecast(forecastData);
      })
      .catch((e) => console.log({ e }));
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);

    if (value !== '') {
      getSearchOptions(value);
    }
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
      onSubmit();
    }
  }, [city]);

  return {
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    setCity,
    getForecast
  };
};

export default useForecast;
