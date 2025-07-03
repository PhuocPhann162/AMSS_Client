import { GeoSearchControl } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface SearchControlProps {
  provider: any;
  showMarker: boolean;
  showPopup: boolean;
  popupFormat: ({ query, result }: { query: any; result: any }) => string;
  maxMarkers: number;
  retainZoomLevel: boolean;
  animateZoom: boolean;
  autoClose: boolean;
  searchLabel: string;
  keepResult: boolean;
}

export const SearchControl: React.FC<SearchControlProps> = ({
  provider,
  showMarker,
  showPopup,
  popupFormat,
  maxMarkers,
  retainZoomLevel,
  animateZoom,
  autoClose,
  searchLabel,
  keepResult,
}) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      showMarker: showMarker,
      showPopup: showPopup,
      popupFormat: popupFormat,
      maxMarkers: maxMarkers,
      retainZoomLevel: retainZoomLevel,
      animateZoom: animateZoom,
      autoClose: autoClose,
      searchLabel: searchLabel,
      keepResult: keepResult,
    });

    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [provider]);

  return null;
};
