import { Marker, Popup } from 'react-leaflet';

interface MarkerProps {
  position: [number, number];
}

const Markers = ({ position }: MarkerProps) => {
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <Marker position={position}>
        <Popup className=''></Popup>
      </Marker>
    </>
  );
};

export default Markers;
