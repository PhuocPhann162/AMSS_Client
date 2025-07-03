import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Marker,
  Popup,
  useMap,
  Polygon,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { FloatButton } from 'antd';
import { AButton } from '@/common/ui-common';
import { SearchControl } from './SearchControl';
import {
  farmModel,
  locationModel,
  pointModel,
  positionModel,
} from '@/interfaces';
import { toastNotify } from '@/helper';
import { useGeolocation } from '@/hooks';
import 'leaflet/dist/leaflet.css';
import { PlusOutlined } from '@ant-design/icons';
import SatelliteIcon from '@/components/Icon/icon-svg/satellite.svg?react';
import StreetMapIcon from '@/components/Icon/icon-svg/street-map.svg?react';
import FloatButtonGroup from 'antd/es/float-button/FloatButtonGroup';
import { PopupFarm } from './PopupFarm';

interface GrowLocationMapProps {
  onLocationSelected: (
    location: locationModel,
    area: number,
    points: pointModel[],
  ) => void;
  farmsData?: farmModel[];
}

type GetAddressDataType = {
  address?: {
    city?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
    quarter?: string;
    state?: string;
    road?: string;
    suburb?: string;
  };
  display_name?: string;
};

const GrowLocationMap: React.FC<GrowLocationMapProps> = ({
  onLocationSelected,
  farmsData = [],
}) => {
  const [mapKey, setMapKey] = useState(0);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite-streets-v11');
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    10.76, 106.66,
  ]);
  const [area, setArea] = useState<number>(0);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [points, setPoints] = useState<pointModel[]>([]);
  const [location, setLocation] = useState<locationModel>({
    address: '',
    lat: 0,
    lng: 0,
  });

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (
      geolocationPosition &&
      geolocationPosition.lat &&
      geolocationPosition.lng
    ) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  const getDrawFarmPolygon = (farmData: farmModel) => {
    const pos: [number, number][] =
      farmData.polygonApp?.positions?.map((position: positionModel) => {
        return [position.lat || 0, position.lng || 0];
      }) ?? [];
    return pos;
  };

  const handleCreatedCancel = () => {
    if (isPolygonDrawn) {
      if (drawnPolygon) {
        mapRef.current.removeLayer(drawnPolygon);
      }
      setDrawnPolygon(null);
      setArea(0);
      setIsPolygonDrawn(false);
    }
  };

  const handleCreated = (e: any) => {
    const layers = e.layer;
    setDrawnPolygon(layers);

    const drawnPolygon = layers.toGeoJSON();
    const area = turf.area(drawnPolygon);
    setArea(area);

    const latLngs = layers.getLatLngs()[0];
    setPoints(latLngs);

    const sum = latLngs.reduce(
      (acc: any, curr: any) => [
        (acc[0] + curr.lat) as number,
        (acc[1] + curr.lng) as number,
      ],
      [0, 0],
    ) as number[];
    const average: [number, number] = [
      sum[0] / latLngs.length,
      sum[1] / latLngs.length,
    ];
    setMapPosition(average);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`,
    )
      .then((response) => response.json())
      .then((dataApi: GetAddressDataType) => {
        const address = dataApi?.display_name || '';
        const locationData = {
          address: address,
          lat: average[0],
          lng: average[1],
          city: dataApi.address?.city || '',
          country: dataApi.address?.country || '',
          countryCode: dataApi.address?.country_code || '',
          postCode: dataApi.address?.postcode || '',
          state: dataApi.address?.quarter || dataApi.address?.state || '',
          road: dataApi.address?.road || '',
          district: dataApi.address?.suburb || '',
        };
        setLocation(locationData);
        onLocationSelected(locationData, area, latLngs);
      })
      .catch((_) => {
        toastNotify('Something error while get address', 'error');
      });

    setIsPolygonDrawn(true);
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const editedPolygon = layer.toGeoJSON();
      const editedArea = turf.area(editedPolygon);
      setArea(editedArea);

      const latLngs = layer.getLatLngs()[0];
      setPoints(latLngs);

      const sum = latLngs.reduce(
        (acc: any, curr: any) => [
          (acc[0] + curr.lat) as number,
          (acc[1] + curr.lng) as number,
        ],
        [0, 0],
      ) as number[];
      const average = [sum[0] / latLngs.length, sum[1] / latLngs.length];

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`,
      )
        .then((response) => response.json())
        .then((dataApi: GetAddressDataType) => {
          const address = dataApi?.display_name || '';
          const locationData = {
            address: address,
            lat: average[0],
            lng: average[1],
            city: dataApi.address?.city || '',
            country: dataApi.address?.country || '',
            countryCode: dataApi.address?.country_code || '',
            postCode: dataApi.address?.postcode || '',
            state: dataApi.address?.quarter || dataApi.address?.state || '',
            road: dataApi.address?.road || '',
            district: dataApi.address?.suburb || '',
          };
          setLocation(locationData);
          onLocationSelected(locationData, editedArea, latLngs);
        })
        .catch((_) => {
          toastNotify('Something error while get address', 'error');
        });
    });
  };

  const ChangeCenter = ({ point }: { point: [number, number] }) => {
    const map = useMap();
    map.setView(point, map.getZoom());
    return null;
  };

  ChangeCenter.displayName = 'ChangeCenter';

  return (
    <div className='relative h-[600px] w-full'>
      <div className='absolute right-4 top-4 z-[999]'>
        <FloatButtonGroup
          trigger='click'
          type='primary'
          icon={<PlusOutlined />}
          style={{ right: 24 }}
        >
          <FloatButton
            icon={
              mapStyle === 'streets-v11' ? (
                <SatelliteIcon style={{ width: '1.5rem', height: '1.5rem' }} />
              ) : (
                <StreetMapIcon style={{ width: '1.5rem', height: '1.5rem' }} />
              )
            }
            tooltip={
              mapStyle === 'streets-v11'
                ? 'Switch to Satellite'
                : 'Switch to Street'
            }
            onClick={() => {
              setMapKey((prev) => prev + 1);
              setMapStyle((prev) =>
                prev === 'streets-v11'
                  ? 'satellite-streets-v11'
                  : 'streets-v11',
              );
            }}
          />
        </FloatButtonGroup>
      </div>

      {!geolocationPosition.lat && (
        <AButton
          type='primary'
          loading={isLoadingPosition}
          className='absolute bottom-16 left-1/2 z-[999] -translate-x-1/2 bg-black uppercase'
          onClick={getPosition}
        >
          {isLoadingPosition ? 'Loading...' : 'Use your location'}
        </AButton>
      )}

      <MapContainer
        ref={mapRef}
        key={mapKey}
        center={{ lat: mapPosition[0], lng: mapPosition[1] }}
        zoom={18}
        scrollWheelZoom={true}
        className='h-full w-full'
      >
        <FeatureGroup>
          <EditControl
            position='topright'
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: {
                shapeOptions: { color: '#4bc552' },
                edit: true,
                showLength: true,
                metric: true,
                feet: true,
                showArea: true,
              },
            }}
            onCreated={handleCreated}
            onEdited={handleEdited}
          />
        </FeatureGroup>
        <FeatureGroup>
          {farmsData &&
            farmsData.map((item: farmModel) => (
              <div key={item.id}>
                <Polygon
                  positions={getDrawFarmPolygon(item)}
                  pathOptions={{
                    color: item.polygonApp?.color,
                    fillColor: 'transparent',
                    weight: 3,
                    fillOpacity: 0.1,
                  }}
                >
                  <Popup className='w-72'>
                    <PopupFarm farmInfo={item} />
                  </Popup>
                </Polygon>
                <Marker
                  position={[
                    item?.location?.lat ?? 0,
                    item?.location?.lng ?? 0,
                  ]}
                >
                  <Popup className='w-72'>
                    <PopupFarm farmInfo={item} />
                  </Popup>
                </Marker>
              </div>
            ))}
        </FeatureGroup>
        <SearchControl
          provider={new OpenStreetMapProvider()}
          showMarker={true}
          showPopup={false}
          popupFormat={({ result }: { query: unknown; result: any }) =>
            result.label as string
          }
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={'Enter address, please🌏'}
          keepResult={true}
        />

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_ACESS_TOKEN}`}
        />

        {geolocationPosition && geolocationPosition.lat && (
          <Marker position={geolocationPosition}>
            <Popup>
              <span>My Location</span>
            </Popup>
          </Marker>
        )}

        <ChangeCenter point={[mapPosition[0], mapPosition[1]]} />
      </MapContainer>

      {isPolygonDrawn && (
        <div className='absolute bottom-4 left-1/2 z-[999] flex -translate-x-1/2 gap-4'>
          <div className='rounded-lg bg-white p-3 shadow-md'>
            <div className='mb-2 flex items-center gap-2'>
              <h3 className='font-bold'>Total Area: </h3>
              <h3>{area.toFixed(2)} m²</h3>
              <h5 className='text-sm'>
                ({turf.convertArea(area, 'meters', 'acres').toFixed(2)} acres)
              </h5>
            </div>
            <div className='flex justify-between gap-2'>
              <AButton onClick={handleCreatedCancel}>Cancel</AButton>
              <AButton
                type='primary'
                onClick={() => onLocationSelected(location, area, points)}
              >
                Continue
              </AButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowLocationMap;
