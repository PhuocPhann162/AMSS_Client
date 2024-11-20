import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../../css/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACESS_TOKEN;

const MapBox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Ngăn việc tạo lại map

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current // Gắn bản đồ vào container
      });

      // Thêm điều khiển phóng to/thu nhỏ
      map.current.addControl(new mapboxgl.NavigationControl());
    }
  }, []);

  return <div ref={mapContainer} className='w-full min-h-[600px] rounded-lg shadow-md' />;
};

export default MapBox;
