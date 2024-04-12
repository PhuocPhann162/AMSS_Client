import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useGeolocation } from '~/hooks/useGeolocation';
import { positionModel } from '~/interfaces';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchControl } from './SearchControl';
import { CreateFarmModal } from './CreateFarmModal';
import { calculatePolygonArea, convertSquareMetersToAcres, getAddress, toastNotify } from '~/utils';

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
  const [farmAddress, setFarmAddress] = useState<string>('');
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);

  const create = (e: any) => {
    console.log(e);
    const layers = e.layer;
    const drawnPolygon = layers.toGeoJSON();
    const polygonCoordinates = drawnPolygon.geometry.coordinates[0];
    const polygonArea = calculatePolygonArea(polygonCoordinates);
    const areaInAcres = convertSquareMetersToAcres(polygonArea);
    setArea(areaInAcres);

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
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className='h-[38rem]'>
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
        <CreateFarmModal area={area} address={farmAddress} />
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
