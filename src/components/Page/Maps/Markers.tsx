import { Marker } from 'react-leaflet';

interface MarkerProps {
  position: [number, number];
  children: JSX.Element;
}

const Markers = ({ position, children }: MarkerProps) => {
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <Marker position={position}>{children}</Marker>
      <div id='openweathermap-widget-11'></div>
    </>
  );
};

export default Markers;
