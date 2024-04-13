import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useGeolocation } from '~/hooks/useGeolocation';
import { positionModel } from '~/interfaces';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchControl } from './SearchControl';
import { CreateFarmModal } from './CreateFarmModal';
import * as turf from '@turf/turf';
import { toastNotify } from '~/helper';

const style = {
  color: '#ee7219',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5,
  fillColor: '#ee7219'
};

const Map: React.FC = () => {
  const [mapPosition, setMapPosition] = useState({ lat: 51.5124, lng: -0.0661 });
  const [area, setArea] = useState<number>(0);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState<boolean>(false);
  const [farmAddress, setFarmAddress] = useState<string>('');
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);

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

  const create = (e: any) => {
    console.log(e);
    const layers = e.layer;
    setDrawnPolygon(layers);

    const drawnPolygon = layers.toGeoJSON();
    const area = turf.area(drawnPolygon);
    console.log(area);
    setArea(area);

    const latLngs = layers.getLatLngs()[0];
    const sum = latLngs.reduce((acc: any, curr: any) => [acc[0] + curr.lat, acc[1] + curr.lng], [0, 0]);
    const average = [sum[0] / latLngs.length, sum[1] / latLngs.length];
    try {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${average[0]}&lon=${average[1]}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          const address = data.display_name;
          setFarmAddress(address);
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
    <div className='h-full relative flex-1'>
      {!geolocationPosition.lat && (
        <button
          className='btn btn-secondary text-white uppercase absolute z-999 bottom-16 left-1/2 -translate-x-1/2'
          onClick={getPosition}
        >
          {isLoadingPosition ? 'Loading...' : 'Use your location'}
        </button>
      )}
      <MapContainer ref={mapRef} center={mapPosition} zoom={13} scrollWheelZoom={true} className='h-[38rem]'>
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
            onCreated={create}
            onDeleted={() => setArea(0)}
          ></EditControl>
          <Polygon
            positions={[
              [51.51, -0.06],
              [51.51, -0.05],
              [51.52, -0.05],
              [51.52, -0.06]
            ]}
            color='purple'
          />
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

        {geolocationPosition && (
          <Marker position={geolocationPosition}>
            <Popup>
              <span>My Location</span>
            </Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <CreateFarmModal area={area} address={farmAddress} onCancel={handleCancel} />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }: positionModel) => {
  const map = useMap();
  map.flyTo(position, map.getZoom());
  return null;
};

export default Map;
