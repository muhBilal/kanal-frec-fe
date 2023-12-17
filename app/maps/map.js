'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ defaultLat, defaultLng }) => {
    return (
        <MapContainer
            center={[defaultLat, defaultLng]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[defaultLat, defaultLng]}>
                <Popup>
                    A marker at ({defaultLat}, {defaultLng})
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
