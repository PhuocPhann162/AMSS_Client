import { forecastType, optionType } from '~/interfaces';
import { SD_Base_Weather_URL } from '~/utils/SD';

const getForecast = async (data: optionType): Promise<forecastType> => {
  try {
    const response = await fetch(
      `${SD_Base_Weather_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${import.meta.env.VITE_APP_NAME}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const responseData = await response.json();

    const forecast: forecastType = {
      ...responseData.city,
      list: responseData.list.slice(0, 16)
    };

    return forecast;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export default getForecast;
