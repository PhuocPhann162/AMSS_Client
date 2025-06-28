import { MapDiv } from '@/pages/commodity-origin/components/map-div';

interface MapComponentProps {
  lng: number;
  lat: number;
}

export const MapComponent = ({ lng, lat }: MapComponentProps) => {
  return (
    <MapDiv
      mapboxToken={import.meta.env.VITE_MAPBOX_ACESS_TOKEN ?? ''}
      lng={lng}
      lat={lat}
    />
  );
};
