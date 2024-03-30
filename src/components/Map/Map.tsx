import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '~/hooks/useGeolocation';
import { useUrlPosition } from '~/hooks/useUrlPosition';

import { positionModel } from '~/interfaces';

const Map = () => {
  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 });
  const [mapLat, mapLng] = useUrlPosition();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition({ lat: parseFloat(mapLat), lng: parseFloat(mapLng) });
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setMapPosition({ lat, lng });

    // Sử dụng API của Mapbox hoặc OpenStreetMap (Nominatim) để lấy địa chỉ từ tọa độ
    // Đây là một ví dụ sử dụng API của OpenStreetMap (Nominatim)
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const address = data.display_name;
        alert(`Bạn đã click tại địa chỉ: ${address}`);
        // Hoặc bạn có thể chuyển hướng người dùng đến trang mới với thông tin địa chỉ
        // navigate(`/address-info?lat=${lat}&lng=${lng}&address=${address}`);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin địa chỉ:', error);
      });
  };

  return (
    <div className='h-full relative flex-1'>
      {!geolocationPosition.lat && (
        <button className='btn btn-nav absolute z-999' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </button>
      )}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className='h-screen'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCenter position={mapPosition} />
        <DetectClick handleMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }: positionModel) => {
  const map = useMap();
  map.setView(position);
  return null;
};

interface MapClickHandlerProps {
  handleMapClick: (e: L.LeafletMouseEvent) => void;
}

const DetectClick: React.FC<MapClickHandlerProps> = ({ handleMapClick }) => {
  const navigate = useNavigate();
  useMapEvents({
    click: handleMapClick
  });
  return null;
};

export default Map;
