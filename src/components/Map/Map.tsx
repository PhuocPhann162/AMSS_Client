import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { positionModel } from '~/interfaces';

const Map = () => {
  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 });

  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');
  return (
    <div className='h-full relative flex-1'>
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
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }: positionModel) => {
  const map = useMap();
  map.setView(position);
  return null;
};

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
}

export default Map;
