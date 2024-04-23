import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useGeolocation } from '~/hooks/useGeolocation';
import { farmModel, fieldModel, locationModel, pointModel } from '~/interfaces';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchControl } from './SearchControl';
import { CreateFarmModal } from './CreateFarmModal';
import * as turf from '@turf/turf';
import { toastNotify } from '~/helper';
import { useUrlPosition } from '~/hooks/useUrlPosition';
import positionModel from '~/interfaces/positionModel';
import { useGetAllFarmsQuery } from '~/api/farmApi';
import { useGetAllFieldsQuery } from '~/api/fieldApi';
import { PopupFarm } from './PopupFarm';
import { MainLoader } from '../common';

const style = {
  color: '#ee7219'
};

const Map: React.FC = () => {
  const [mapKey, setMapKey] = useState(0);
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [area, setArea] = useState<number>(0);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [farmAddress, setFarmAddress] = useState<locationModel>({ address: '', lat: 0, lng: 0 });
  const [mapLat, mapLng] = useUrlPosition();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  const mapRef = useRef<any>(null);
  const [points, setPoints] = useState<pointModel[]>();

  const { data: dataFarm } = useGetAllFarmsQuery('');
  const { data: dataField, isLoading } = useGetAllFieldsQuery('');

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

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

  const handleCancel = () => {
    if (isPolygonDrawn) {
      // Xóa polygon được vẽ khỏi bản đồ
      if (drawnPolygon) {
        mapRef.current.removeLayer(drawnPolygon);
      }
      setDrawnPolygon(null); // Reset state của polygon được vẽ
      setArea(0); // Reset area
      setIsPolygonDrawn(false); // Reset trạng thái của polygon được vẽ
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

    const sum = latLngs.reduce((acc: any, curr: any) => [acc[0] + curr.lat, acc[1] + curr.lng], [0, 0]);
    const average = [sum[0] / latLngs.length, sum[1] / latLngs.length];
    setMapPosition(average);
    try {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`)
        .then((response) => response.json())
        .then((dataApi) => {
          const address = dataApi.display_name;
          setFarmAddress({ address: address, lat: average[0], lng: average[1] });
        })
        .catch((error) => {
          toastNotify('Something error while get address', 'error');
        });
    } catch (error) {
      toastNotify('Something error while get address', 'error');
    }

    setIsPolygonDrawn(true);
    (document.getElementById('create_farm_modal') as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className='h-full relative flex-1 overflow-hidden'>
          {!geolocationPosition.lat && (
            <button
              className='btn btn-secondary text-white uppercase absolute z-999 bottom-16 left-1/2 -translate-x-1/2'
              onClick={getPosition}
            >
              {isLoadingPosition ? 'Loading...' : 'Use your location'}
            </button>
          )}
          <MapContainer
            ref={mapRef}
            key={mapKey}
            center={{ lat: mapPosition[0], lng: mapPosition[1] }}
            zoom={20}
            scrollWheelZoom={true}
            className='h-[38rem]'
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
                    edit: false,
                    showLength: true,
                    metric: true,
                    feet: false,
                    showArea: true
                  }
                }}
                onCreated={handleCreated}
                onDeleted={() => setArea(0)}
              ></EditControl>
            </FeatureGroup>
            <SearchControl
              provider={new OpenStreetMapProvider()}
              showMarker={true}
              showPopup={false}
              popupFormat={({ query, result }: { query: any; result: any }) => result.label}
              maxMarkers={3}
              retainZoomLevel={false}
              animateZoom={true}
              autoClose={false}
              searchLabel={'Enter address, please🌏'}
              keepResult={true}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />

            {dataFarm &&
              dataFarm?.apiResponse?.result.map((item: farmModel) => (
                <div key={item.id}>
                  <Polygon
                    positions={getDrawFarmPolygon(item)}
                    pathOptions={{
                      color: item.polygonApp?.color,
                      fillColor: 'transparent'
                    }}
                  >
                    <Popup className='w-72'>
                      <PopupFarm farmInfo={item} />
                    </Popup>
                  </Polygon>
                  <Marker position={[item?.location?.lat ?? 0, item?.location?.lng ?? 0]}>
                    <Popup className='w-72'>
                      <PopupFarm farmInfo={item} />
                    </Popup>
                  </Marker>
                </div>
              ))}

            {dataField &&
              dataField?.apiResponse?.result.map((item: fieldModel) => (
                <div key={item.id}>
                  <Polygon
                    positions={getDrawFieldPolygon(item)}
                    pathOptions={{
                      color: item.polygonApp?.color,
                      fillColor: item.polygonApp?.color
                    }}
                  >
                    <Popup className='w-72'>
                      <PopupFarm farmInfo={item} />
                    </Popup>
                  </Polygon>
                </div>
              ))}

            {geolocationPosition && (
              <Marker position={geolocationPosition}>
                <Popup>
                  <span>My Location</span>
                </Popup>
              </Marker>
            )}
            <ChangeCenter point={[mapPosition[0], mapPosition[1]]} />
            <CreateFarmModal area={area} location={farmAddress} points={points} onCancel={handleCancel} />
          </MapContainer>
        </div>
      )}
    </>
  );
};

const ChangeCenter = ({ point }: pointModel) => {
  const map = useMap();
  map.flyTo(point, map.getZoom());
  return null;
};

export default Map;
