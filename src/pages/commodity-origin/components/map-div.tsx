/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from 'react';

interface MapDivProps {
  mapboxToken: string;
  lng: number;
  lat: number;
}

export const MapDiv = ({ mapboxToken, lng, lat }: MapDivProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    const loadMapbox = async () => {
      try {
        // Dynamically import mapbox-gl
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');

        if (!mapContainer.current || map.current) return;

        mapboxgl.default.accessToken = mapboxToken;

        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: {
            lng,
            lat,
          }, // Plot coordinates
          zoom: 15,
          pitch: 45,
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.default.NavigationControl(),
          'top-right',
        );

        // Add markers for plot and farm
        map.current.on('load', () => {
          // Plot marker
          new mapboxgl.default.Marker({ color: '#059669' })
            .setLngLat({ lng, lat })
            .setPopup(
              new mapboxgl.default.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold text-green-800">Field Street FS01</h3>
                  <p class="text-sm text-gray-600">Plot ID: FSF01</p>
                  <p class="text-sm text-gray-600">Area: 6,285 m²</p>
                  <p class="text-sm text-gray-600">Status: Harvesting</p>
                </div>
              `),
            )
            .addTo(map.current);

          // Farm marker (different location)
          new mapboxgl.default.Marker({ color: '#dc2626' })
            .setLngLat({ lng: 107.0, lat: 10.85 })
            .setPopup(
              new mapboxgl.default.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold text-red-800">Farm Street FS01</h3>
                  <p class="text-sm text-gray-600">Owner: Phuoc Phan</p>
                  <p class="text-sm text-gray-600">Area: 15,651 m²</p>
                </div>
              `),
            )
            .addTo(map.current);
        });
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMapbox();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng, mapboxToken]);

  return <div ref={mapContainer} className='h-96 w-full' />;
};
