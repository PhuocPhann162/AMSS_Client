import React, { useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Map = () => {
  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 });
  return (
    <div>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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

export default Map;
