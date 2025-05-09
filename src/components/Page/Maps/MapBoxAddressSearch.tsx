import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface AddressData {
  placeName: string;
  placeType: string[];
  coordinates: {
    lng: number;
    lat: number;
  };
  fullAddress: string;
  text: string;
  context: Array<{
    id: string;
    text: string;
    [key: string]: any;
  }>;
  properties: Record<string, any>;
}

interface Coordinates {
  lng: number;
  lat: number;
}

interface MapboxAddressSearchProps {
  onAddressSelected: (addressData: AddressData | null) => void;
  defaultLocation?: Coordinates;
  style?: React.CSSProperties;
  placeholder?: string;
  markerColor?: string;
}

interface GeocoderResult {
  result: {
    place_name: string;
    place_type: string[];
    center: [number, number];
    text: string;
    context?: Array<{
      id: string;
      text: string;
      [key: string]: any;
    }>;
    properties?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
}

const MapboxAddressSearch: React.FC<MapboxAddressSearchProps> = ({
  onAddressSelected,
  defaultLocation = { lng: 105.8342, lat: 21.0278 },
  style = { width: '100%', height: '400px' },
  placeholder = 'Search Address...',
  markerColor = '#3FB1CE',
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);

  const reverseGeocode = async (lngLat: { lng: number; lat: number }) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}&language=vi&country=vn`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];

        const addressData: AddressData = {
          placeName: feature.place_name,
          placeType: feature.place_type,
          coordinates: {
            lng: lngLat.lng,
            lat: lngLat.lat,
          },
          fullAddress: feature.place_name,
          text: feature.text,
          context: feature.context || [],
          properties: feature.properties || {},
        };

        onAddressSelected(addressData);
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  };

  // Hàm cập nhật vị trí marker
  const updateMarkerPosition = (coordinates: { lng: number; lat: number }) => {
    if (!map.current) return;

    if (!marker.current) {
      // Tạo marker mới nếu chưa có
      marker.current = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map.current);
    } else {
      // Cập nhật vị trí marker nếu đã có
      marker.current.setLngLat([coordinates.lng, coordinates.lat]);
    }

    // Di chuyển map đến vị trí mới
    map.current.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
    });
  };

  // Khởi tạo map một lần duy nhất
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [defaultLocation.lng, defaultLocation.lat],
      zoom: 12,
    });

    map.current.on('load', () => {
      setMapInitialized(true);
    });

    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }

      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Không có dependencies để đảm bảo chỉ chạy một lần

  // Thiết lập geocoder, marker và event listeners sau khi map đã được khởi tạo
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    if (!geocoder.current) {
      geocoder.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken!,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: placeholder,
      });

      map.current.addControl(geocoder.current);

      // Khởi tạo marker ban đầu
      marker.current = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([defaultLocation.lng, defaultLocation.lat])
        .addTo(map.current);

      // Xử lý sự kiện khi chọn địa điểm từ thanh tìm kiếm
      geocoder.current.on('result', (event: GeocoderResult) => {
        const result = event.result;
        const coordinates = {
          lng: result.center[0],
          lat: result.center[1],
        };

        updateMarkerPosition(coordinates);

        const addressData: AddressData = {
          placeName: result.place_name,
          placeType: result.place_type,
          coordinates,
          fullAddress: result.place_name,
          text: result.text,
          context: result.context || [],
          properties: result.properties || {},
        };

        onAddressSelected(addressData);
      });

      // Xử lý sự kiện khi xóa kết quả tìm kiếm
      geocoder.current.on('clear', () => {
        onAddressSelected(null);
        if (marker.current) {
          marker.current.remove();
          marker.current = null;
        }
      });

      // Xử lý sự kiện click trên bản đồ
      map.current.on('click', (e) => {
        const lngLat = e.lngLat;
        const coordinates = { lng: lngLat.lng, lat: lngLat.lat };

        updateMarkerPosition(coordinates);
        reverseGeocode(coordinates);
      });
    }

    // Cập nhật placeholder nếu thay đổi
    if (geocoder.current && geocoder.current.setPlaceholder) {
      geocoder.current.setPlaceholder(placeholder);
    }

    // Cập nhật marker color nếu thay đổi
    if (marker.current && marker.current.getElement) {
      const markerElement = marker.current.getElement();
      if (markerElement) {
        markerElement.style.color = markerColor;
      }
    }
  }, [mapInitialized, placeholder, markerColor, onAddressSelected]);

  return (
    <div className='mapbox-address-search'>
      <div ref={mapContainer} style={style} className='map-container' />
    </div>
  );
};

export default MapboxAddressSearch;
