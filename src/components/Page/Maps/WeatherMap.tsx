import { useState } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import { SearchControl } from './SearchControl';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const WeatherMap = () => {
  const [center] = useState([19.076, 72.8777]);

  const maps = (
    <MapContainer
      center={{ lat: center[0], lng: center[1] }}
      zoom={12}
      scrollWheelZoom={true}
      className='h-[38rem]'
    >
      <SearchControl
        provider={new OpenStreetMapProvider()}
        showMarker={true}
        showPopup={false}
        popupFormat={({ result }: { query: any; result: any }) => result.label}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={'Enter address, please🌏'}
        keepResult={true}
      />
      <TileLayer
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_APP_NAME}`}
      />
      <LayersControl position='topright'>
        <LayersControl.BaseLayer name='Temperature'>
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_APP_NAME}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Precipitation'>
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_APP_NAME}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Wind'>
          <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_APP_NAME}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Clouds'>
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_APP_NAME}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Clear Map'>
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );

  return <div className='relative h-full flex-1 overflow-hidden'>{maps}</div>;
};

export default WeatherMap;
