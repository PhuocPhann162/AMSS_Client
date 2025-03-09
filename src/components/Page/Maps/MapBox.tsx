import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { VesselFeature, vessels } from '@/constants/realTimeObject';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACESS_TOKEN;

const MapBox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map>();

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current?.on('style.load', () => {
        map.current?.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
          if (error) throw error;

          if (image) {
            // Add custom image to the map
            map.current?.addImage('custom-marker', image);

            vessels.forEach((vessel) => {
              // Add vessel point source and layer
              map.current?.addSource(`vessel-source-${vessel.id}`, {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: []
                }
              });

              map.current?.addLayer({
                id: `vessel-layer-${vessel.id}`,
                type: 'symbol', // Change the layer type to "symbol"
                source: `vessel-source-${vessel.id}`,
                layout: {
                  'icon-image': 'custom-marker',
                  'icon-size': 0.09, // Adjust the size of the custom image
                  'icon-allow-overlap': true // Allow overlapping symbols
                }
              });

              // Add vessel line source and layer
              map.current?.addSource(`vessel-line-source-${vessel.id}`, {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: []
                }
              });

              map.current?.addLayer({
                id: `vessel-line-layer-${vessel.id}`,
                type: 'line',
                source: `vessel-line-source-${vessel.id}`,
                paint: {
                  'line-color': '#ff0000',
                  'line-width': 2
                }
              });

              // Initialize vessel path
              vessel.path = [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: vessel.coordinates
                  },
                  properties: {
                    name: vessel.name
                  }
                }
              ];
            });
          } else {
            console.error('Failed to load the custom image.');
          }
        });

        setInterval(() => {
          vessels.forEach((vessel) => {
            vessel.coordinates = [
              vessel.coordinates[0] + 0.01 * Math.random(),
              vessel.coordinates[1] + 0.01 * Math.random()
            ];

            const source = map.current?.getSource(`vessel-source-${vessel.id}`);

            if (source && source.type === 'geojson') {
              const newFeature: VesselFeature = {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: vessel.coordinates
                },
                properties: {
                  name: vessel.name
                }
              };

              source.setData({
                type: 'FeatureCollection',
                features: [newFeature]
              });

              const lineSource = map.current?.getSource(`vessel-line-source-${vessel.id}`);
              if (lineSource && lineSource.type === 'geojson') {
                // Update vessel path
                vessel.path.push(newFeature);

                const lineStringFeature: GeoJSON.Feature<
                  GeoJSON.LineString,
                  {
                    //
                  }
                > = {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: vessel.path.map((f) => f.geometry.coordinates)
                  },
                  properties: {}
                };

                lineSource.setData({
                  type: 'FeatureCollection',
                  features: vessel.path.length > 1 ? [lineStringFeature] : []
                });
              }
            }
          });
        }, 3000);
      });
    }
  }, []);

  return <div ref={mapContainer} className='w-full min-h-[600px] rounded-lg shadow-md' />;
};

export default MapBox;
