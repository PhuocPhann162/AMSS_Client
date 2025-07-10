import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  FeatureGroup,
  Polygon,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import {
  farmModel,
  fieldModel,
  locationModel,
  pointModel,
  positionModel,
} from '@/interfaces';
import SatelliteIcon from '@/components/Icon/icon-svg/satellite.svg?react';
import StreetMapIcon from '@/components/Icon/icon-svg/street-map.svg?react';
import { PlusOutlined } from '@ant-design/icons';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchControl } from './SearchControl';
import { CreateLandModal } from './CreateLandModal';
import * as turf from '@turf/turf';
import { toastNotify } from '@/helper';
import { useGetAllFarmsQuery } from '@/api';
import { useGetAllFieldsQuery } from '@/api';
import { PopupFarm } from './PopupFarm';
import { PopupField } from './PopupField';
import { UpdateLandModal } from './UpdateLandModal';
import { useGeolocation, useUrlPosition } from '@/hooks';
import 'leaflet/dist/leaflet.css';
import { AButton } from '@/common/ui-common';
import FloatButtonGroup from 'antd/es/float-button/FloatButtonGroup';
import { FloatButton } from 'antd';
import 'leaflet/dist/leaflet.css';

const style = {
  color: '#ee7219',
};

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

const Map: React.FC = () => {
  const [mapKey, setMapKey] = useState(0);
  const [mapStyle, setMapStyle] = useState('streets-v11');
  const [mapPosition, setMapPosition] = useState([10.76, 106.66]);
  const [area, setArea] = useState<number>(0);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [farmAddress, setFarmAddress] = useState<locationModel>({
    address: '',
    lat: 0,
    lng: 0,
  });
  const [points, setPoints] = useState<pointModel[]>();
  const [isOpenCreateLandModal, setIsOpenCreateLandModal] = useState(false);
  const [fieldId, polygonId, mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const mapRef = useRef<any>(null);

  const { data: dataFarm } = useGetAllFarmsQuery('');
  const { data: dataField } = useGetAllFieldsQuery('');

  useEffect(() => {
    if (
      geolocationPosition &&
      geolocationPosition.lat &&
      geolocationPosition.lng
    ) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [fieldId, polygonId, mapLat, mapLng]);

  const getDrawFarmPolygon = (farmData: farmModel) => {
    const pos: [number, number][] =
      farmData.polygonApp?.positions?.map((position: positionModel) => {
        return [position.lat || 0, position.lng || 0];
      }) ?? [];
    return pos;
  };

  const getDrawFieldPolygon = (fieldData: fieldModel) => {
    const pos: [number, number][] =
      fieldData.polygonApp?.positions?.map((position: positionModel) => {
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
    const average = [sum[0] / latLngs.length, sum[1] / latLngs.length];
    setMapPosition(average);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`,
    )
      .then((response) => response.json())
      .then((dataApi: GetAddressDataType) => {
        const address = dataApi?.display_name || '';
        setFarmAddress({
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
        });
      })
      .catch((_) => {
        toastNotify('Something error while get address', 'error');
      });

    setIsPolygonDrawn(true);
    setIsOpenCreateLandModal(true);
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    const area = turf.area(layers.toGeoJSON());
    setArea(area);
    let latLngs: any[] = [];
    layers.eachLayer((layer: any) => {
      latLngs = layer.getLatLngs()[0];
      setPoints(layer.getLatLngs()[0]);
    });

    if (latLngs !== undefined) {
      const sum = latLngs.reduce(
        (acc: any, curr: any) => [
          (acc[0] + curr.lat) as number,
          (acc[1] + curr.lng) as number,
        ],
        [0, 0],
      ) as number[];
      const average = [sum[0] / latLngs.length, sum[1] / latLngs.length];
      setMapPosition(average);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`,
      )
        .then((response) => response.json())
        .then((dataApi: GetAddressDataType) => {
          const address = dataApi.display_name;
          setFarmAddress({
            address: address,
            lat: average[0],
            lng: average[1],
            city: dataApi.address?.city,
            country: dataApi.address?.country,
            countryCode: dataApi.address?.country_code,
            postCode: dataApi.address?.postcode,
            state: dataApi.address?.quarter,
            road: dataApi.address?.road,
            district: dataApi.address?.suburb,
          });
        })
        .catch((_) => {
          toastNotify('Something error while get address', 'error');
        });
    } else {
      return;
    }

    (
      document.getElementById('update_land_modal') as HTMLDialogElement
    )?.showModal();
  };

  return (
    <>
      <div className='relative h-full flex-1 overflow-hidden'>
        <div className='absolute z-[999] rounded-md'>
          <FloatButtonGroup
            trigger='click'
            type='primary'
            icon={<PlusOutlined />}
            style={{ right: 24 }}
          >
            <FloatButton
              icon={
                mapStyle === 'streets-v11' ? (
                  <SatelliteIcon
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                ) : (
                  <StreetMapIcon
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
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
          zoom={20}
          scrollWheelZoom={true}
          className='h-[42rem]'
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
                  shapeOptions: style,
                  edit: true,
                  showLength: true,
                  metric: true,
                  feet: true,
                  showArea: true,
                },
              }}
              onCreated={handleCreated}
              onEdited={handleEdited}
            ></EditControl>
            {dataFarm &&
              (dataFarm?.apiResponse?.result as farmModel[]).map(
                (item: farmModel) => (
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
                ),
              )}
            {dataField &&
              (dataField?.apiResponse?.result as fieldModel[]).map(
                (item: fieldModel) => (
                  <div key={item.id}>
                    <Polygon
                      positions={getDrawFieldPolygon(item)}
                      pathOptions={{
                        color: item.polygonApp?.color,
                        fillColor: item.polygonApp?.color,
                        weight: 2,
                        fillOpacity: 0.4,
                      }}
                    >
                      <Popup className='w-72'>
                        <PopupField fieldInfo={item} />
                      </Popup>
                    </Polygon>
                  </div>
                ),
              )}
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

          {geolocationPosition && (
            <Marker position={geolocationPosition}>
              <Popup>
                <span>My Location</span>
              </Popup>
            </Marker>
          )}
          <ChangeCenter point={[mapPosition[0], mapPosition[1]]} />
          <CreateLandModal
            isOpen={isOpenCreateLandModal}
            setIsOpen={setIsOpenCreateLandModal}
            area={area}
            location={farmAddress}
            points={points || []}
            onCancel={handleCreatedCancel}
          />
          <UpdateLandModal
            area={area}
            location={farmAddress}
            points={points!}
          />
        </MapContainer>
      </div>
    </>
  );
};

const ChangeCenter = ({ point }: pointModel) => {
  const map = useMap();
  map.flyTo(point, map.getZoom());
  return null;
};

// const DetectClick = () => {
//   const navigate = useNavigate();
//   useMapEvents({
//     click: (e) => {
//       navigate(`/app/map?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
//     }
//   });
//   return null;
// };

export default Map;
