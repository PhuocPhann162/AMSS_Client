interface optionType {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface forecastType {
  name: string;
  country: string;
  list: [
    {
      dt: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      weather: [
        {
          main: string;
          icon: string;
          description: string;
        }
      ];
      wind: {
        speed: number;
        gust: number;
        deg: number;
      };
      rain?: {
        '1h': number;
        '3h': number;
      };
      clouds: {
        all: number;
      };
      pop: number;
      visibility: number;
    }
  ];
  sunrise: number;
  sunset: number;
}

export type { optionType, forecastType };
