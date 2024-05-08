import { airPollutionType } from '~/interfaces';

export const getAirPollution = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_NAME}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const responseData = await response.json();

    const airPollution: airPollutionType = {
      coord: responseData.coord,
      list: responseData.list
    };

    return airPollution;
  } catch (error: any) {
    console.error('Error fetching forecast data:', error);
    throw error(error.message);
  }
};

interface Thresholds {
  good: number;
  fair: number;
  moderate: number;
  poor: number;
  veryPoor: number;
}

export const evaluatePollutantLevelDescription = (pollutant: string, value: number): string => {
  const thresholds: Record<string, Thresholds> = {
    co: { good: 4400, fair: 9400, moderate: 12400, poor: 15400, veryPoor: Infinity },
    nh3: { good: 40, fair: 70, moderate: 150, poor: 200, veryPoor: Infinity },
    no: { good: 40, fair: 70, moderate: 150, poor: 200, veryPoor: Infinity },
    no2: { good: 40, fair: 70, moderate: 150, poor: 200, veryPoor: Infinity },
    o3: { good: 60, fair: 100, moderate: 140, poor: 180, veryPoor: Infinity },
    pm2_5: { good: 10, fair: 25, moderate: 50, poor: 75, veryPoor: Infinity },
    pm10: { good: 20, fair: 50, moderate: 100, poor: 200, veryPoor: Infinity },
    so2: { good: 20, fair: 80, moderate: 250, poor: 350, veryPoor: Infinity }
  };

  if (value < thresholds[pollutant].good) {
    return 'Not causing pollution';
  } else if (value >= thresholds[pollutant].good && value < thresholds[pollutant].fair) {
    return 'Moderate level of pollution';
  } else if (value >= thresholds[pollutant].fair && value < thresholds[pollutant].moderate) {
    return 'High level of pollution';
  } else if (value >= thresholds[pollutant].moderate && value < thresholds[pollutant].poor) {
    return 'Very high level of pollution';
  } else {
    return 'Dangerous level of pollution';
  }
};
