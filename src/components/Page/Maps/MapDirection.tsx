import { icon } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { FaTractor } from 'react-icons/fa';
import L from 'leaflet';
import { useSearchParams } from 'react-router-dom';

// Types for Mapbox Directions API
interface DirectionsResponse {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry?: {
    coordinates: number[][];
    type: string;
  };
}

interface Leg {
  notifications: Notification[];
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
}

interface Step {
  intersections: Intersection[];
  driving_side?: string;
  geometry: {
    coordinates: number[][];
    type: string;
  };
  mode?: string;
  maneuver: Maneuver;
  weight: number;
  duration: number;
  name: string;
  distance: number;
}

interface Maneuver {
  bearing_after?: number;
  bearing_before?: number;
  location: number[];
  modifier?: string;
  type: string;
  instruction: string;
}

interface Intersection {
  entry: boolean[];
  bearings: number[];
  duration?: number;
  mapbox_streets_v8?: {
    class: string;
  };
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  weight?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  traffic_signal?: boolean;
  turn_weight?: number;
  turn_duration?: number;
}

interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

interface Notification {
  details: {
    actual_value?: string;
    message: string;
  };
  subtype: string;
  type: string;
  geometry_index_end: number;
  geometry_index_start: number;
}

interface Waypoint {
  hint: string;
  distance: number;
  name: string;
  location: number[];
}

export const MapboxDirections: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [directionsData, setDirectionsData] =
    useState<DirectionsResponse | null>(null);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get values from query params
  const startLat = parseFloat(searchParams.get('startLat') || '0');
  const startLng = parseFloat(searchParams.get('startLng') || '0');
  const endLat = parseFloat(searchParams.get('endLat') || '0');
  const endLng = parseFloat(searchParams.get('endLng') || '0');
  const startLocationName =
    searchParams.get('startLocationName') || 'Start Location';
  const endLocationName = searchParams.get('endLocationName') || 'End Location';

  // Initialize coordinates from query params
  const [startCoords, setStartCoords] = useState<[number, number]>([
    startLng,
    startLat,
  ]);
  const [endCoords, setEndCoords] = useState<[number, number]>([
    endLng,
    endLat,
  ]);

  // Update coordinates when query params change
  useEffect(() => {
    setStartCoords([startLng, startLat]);
    setEndCoords([endLng, endLat]);
  }, [startLat, startLng, endLat, endLng]);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACESS_TOKEN;

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      try {
        // Add Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);

        // Load Leaflet JS
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src =
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        mapRef.current = L.map(mapContainer.current!, {
          center: [40.767887, -73.970393],
          zoom: 12,
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapRef.current);

        setMapLoaded(true);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
        alert('Failed to load map. Please refresh the page.');
      }
    };

    loadLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const fetchDirections = async () => {
    setIsLoading(true);
    try {
      if (!MAPBOX_TOKEN) {
        throw new Error('Mapbox token is not configured');
      }

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_TOKEN}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as DirectionsResponse;

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No routes found');
      }

      setDirectionsData(data);
      displayRoute(data, 0);
    } catch (error) {
      console.error('Error fetching directions:', error);
      // Show error to user instead of using mock data
      alert(
        'Failed to fetch directions. Please check your Mapbox token and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const displayRoute = (data: DirectionsResponse, routeIndex: number) => {
    if (!mapRef.current || !mapLoaded || !data.routes[routeIndex]) {
      console.error('Map not ready or no route data available');
      return;
    }

    const L = (window as any).L;
    const route = data.routes[routeIndex];

    // Clear existing layers
    mapRef.current.eachLayer((layer: any) => {
      if (layer.options && (layer.options.isRoute || layer.options.isMarker)) {
        mapRef.current?.removeLayer(layer);
      }
    });

    try {
      // Collect all coordinates from steps
      const allCoordinates: [number, number][] = [];

      if (!route.legs || route.legs.length === 0) {
        throw new Error('No legs found in route');
      }

      const leg = route.legs[0];
      if (!leg.steps || leg.steps.length === 0) {
        throw new Error('No steps found in leg');
      }

      leg.steps.forEach((step) => {
        if (!step.geometry || !step.geometry.coordinates) {
          console.warn('Missing geometry data');
          return;
        }

        step.geometry.coordinates.forEach((coord) => {
          if (Array.isArray(coord) && coord.length >= 2) {
            allCoordinates.push([coord[1], coord[0]]); // Leaflet uses [lat, lng]
          }
        });
      });

      // Add route polyline
      if (allCoordinates.length > 0) {
        // Fit map to route bounds
        const bounds = L.latLngBounds(allCoordinates);
        mapRef.current.fitBounds(bounds, { padding: [20, 20] });

        // Add start marker
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        L.circleMarker([startCoords[1], startCoords[0]], {
          radius: 10,
          fillColor: '#4CAF50',
          color: '#4CAF50',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
          isMarker: true,
        }).addTo(mapRef.current);

        // Add end marker
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        L.circleMarker([endCoords[1], endCoords[0]], {
          radius: 10,
          fillColor: '#f44336',
          color: '#f44336',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
          isMarker: true,
        }).addTo(mapRef.current);
      } else {
        throw new Error('No valid coordinates found in route');
      }
    } catch (error) {
      console.error('Error displaying route:', error);
      // Don't show alert here, just log the error
      return;
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} minutes, ${remainingSeconds} seconds`;
  };

  const formatDistance = (meters: number): string => {
    const km = (meters / 1000).toFixed(1);
    const miles = (meters * 0.000621371).toFixed(1);
    return `${km} km | ${miles} mi`;
  };

  const getStepInstructions = (steps: Step[]): string[] => {
    return steps.map((step) => step.maneuver.instruction);
  };

  useEffect(() => {
    if (mapLoaded) {
      fetchDirections();
    }
  }, [mapLoaded, startCoords, endCoords]);

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-96 overflow-y-auto bg-white shadow-lg'>
        <div className='border-b p-4'>
          <h2 className='mb-4 text-xl font-bold text-gray-800'>
            Tracking your Order Location
          </h2>

          {/* Coordinates Input */}
          <div className='mb-4 space-y-3'>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                From:
              </label>
              <div className='mb-2 text-sm font-medium text-gray-900'>
                {startLocationName}
              </div>
              <input
                type='text'
                value={`${startCoords[0]}, ${startCoords[1]}`}
                onChange={(e) => {
                  const coords = e.target.value
                    .split(',')
                    .map((c) => parseFloat(c.trim()));
                  if (
                    coords.length === 2 &&
                    !isNaN(coords[0]) &&
                    !isNaN(coords[1])
                  ) {
                    setStartCoords([coords[0], coords[1]]);
                  }
                }}
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                To:
              </label>
              <div className='mb-2 text-sm font-medium text-gray-900'>
                {endLocationName}
              </div>
              <input
                type='text'
                value={`${endCoords[0]}, ${endCoords[1]}`}
                onChange={(e) => {
                  const coords = e.target.value
                    .split(',')
                    .map((c) => parseFloat(c.trim()));
                  if (
                    coords.length === 2 &&
                    !isNaN(coords[0]) &&
                    !isNaN(coords[1])
                  ) {
                    setEndCoords([coords[0], coords[1]]);
                  }
                }}
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500'
              />
            </div>
            <button
              onClick={fetchDirections}
              disabled={isLoading}
              className='bg- w-full rounded-md bg-gradient-to-r from-black to-yellow-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50'
            >
              {isLoading ? 'Loading...' : 'Get Directions'}
            </button>
          </div>

          <div className='text-xs text-gray-500'>
            <p>
              Note: Using demo data for showcase. Replace MAPBOX_TOKEN with your
              actual token for real API calls.
            </p>
          </div>
        </div>

        {/* Route Information */}
        {directionsData && directionsData.routes.length > 0 && (
          <div className='p-4'>
            <div className='mb-4 rounded-lg bg-black p-4 text-white'>
              <div className='mb-2 flex items-center space-x-2'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-lg font-semibold'>
                  {formatDuration(
                    directionsData.routes[selectedRoute].duration,
                  )}
                </span>
              </div>
              <div className='text-blue-100'>
                {formatDistance(directionsData.routes[selectedRoute].distance)}
              </div>
              <button className='mt-2 rounded bg-yellow-600 px-4 py-1 text-sm text-white transition-colors hover:bg-yellow-700'>
                Send feedback about this route
              </button>
            </div>

            {/* Alternative Routes */}
            {directionsData.routes.length > 1 && (
              <div className='mb-4'>
                <h3 className='mb-2 font-medium text-gray-700'>
                  Alternative Routes
                </h3>
                <div className='space-y-2'>
                  {directionsData.routes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedRoute(index);
                        displayRoute(directionsData, index);
                      }}
                      className={`w-full rounded-md border p-3 text-left transition-colors ${
                        selectedRoute === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className='font-medium'>Route {index + 1}</div>
                      <div className='text-sm text-gray-600'>
                        {formatDuration(route.duration)} •{' '}
                        {formatDistance(route.distance)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step directions */}
            <div className='mb-4'>
              <h3 className='mb-3 font-medium text-gray-700'>Steps</h3>
              <div className='space-y-2'>
                {getStepInstructions(
                  directionsData.routes[selectedRoute].legs[0].steps,
                ).map((instruction, index) => (
                  <div
                    key={index}
                    className='flex items-start space-x-3 rounded-md bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                  >
                    <div className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-medium text-white'>
                      {index + 1}
                    </div>
                    <div className='text-sm leading-relaxed text-gray-700'>
                      {instruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            {directionsData.routes[selectedRoute].legs[0].notifications.length >
              0 && (
              <div>
                <h3 className='mb-2 font-medium text-gray-700'>Alerts</h3>
                <div className='space-y-2'>
                  {directionsData.routes[
                    selectedRoute
                  ].legs[0].notifications.map((notification, index) => (
                    <div
                      key={index}
                      className='flex items-start space-x-2 rounded-md border border-yellow-200 bg-yellow-50 p-3'
                    >
                      <svg
                        className='mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                        />
                      </svg>
                      <div className='text-sm text-yellow-800'>
                        {notification.details.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className='relative flex-1'>
        <div ref={mapContainer} className='h-full w-full bg-gray-200' />

        {!mapLoaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
            <div className='text-center'>
              <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
              <p className='text-gray-600'>Loading map...</p>
            </div>
          </div>
        )}

        {/* Map Controls Info */}
        <div className='absolute right-4 top-4 rounded-md bg-white px-3 py-2 shadow-md'>
          <div className='text-sm text-gray-600'>
            Interactive Map with Directions
          </div>
        </div>
      </div>
    </div>
  );
};
