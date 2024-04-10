import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useNavigate } from 'react-router-dom';
import { Modal } from '~/common';
import { useGeolocation } from '~/hooks/useGeolocation';
import { positionModel } from '~/interfaces';
import { SearchControl } from './SearchControl';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const Map: React.FC = () => {
  const [mapPosition, setMapPosition] = useState({ lat: 51.5124, lng: -0.0661 });
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    modal?.showModal();
    const { lat, lng } = e.latlng;
    setMapPosition({ lat, lng });

    // Sử dụng API của Mapbox hoặc OpenStreetMap (Nominatim) để lấy địa chỉ từ tọa độ

    try {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const address = data.display_name;
          alert(`Bạn đã click tại địa chỉ: ${address}`);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy thông tin địa chỉ:', error);
        });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin địa chỉ:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Đã submit form');
  };

  const create = (e: any) => {
    console.log(e);
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
            draw={{ rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false }}
            onCreated={create}
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
        <DetectClick handleMapClick={handleMapClick} />
      </MapContainer>
      {/* <Modal onSubmit={handleSubmit} /> */}
    </div>
  );
};

const ChangeCenter = ({ position }: positionModel) => {
  const map = useMap();
  map.flyTo(position, map.getZoom());
  return null;
};

interface MapClickHandlerProps {
  handleMapClick: (e: L.LeafletMouseEvent) => void;
}

const DetectClick: React.FC<MapClickHandlerProps> = ({ handleMapClick }) => {
  const navigate = useNavigate();
  useMapEvents({});
  return null;
};

export default Map;
