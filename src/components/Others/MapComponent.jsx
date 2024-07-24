import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import the icon images
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

// Coordinates for additional locations
const additionalMarkers = [
    { position: [14.6552, 121.0430], label: "SM North Edsa" }, // SM North Edsa
    { position: [14.6510, 121.0378], label: "Trinoma" }, // Trinoma
    { position: [14.6518, 121.0390], label: "LRT Station" }, // LRT Station
    { position: [14.6612, 121.0317], label: "Walter Mart Munoz" }, // Walter Mart Munoz
    { position: [14.6513, 121.0453], label: "Balintawak LRT" }, // Balintawak LRT
    { position: [14.6575, 121.0376], label: "Ayala Mall Balintawak" }, // Ayala Mall Balintawak
    { position: [14.6516, 121.0247], label: "Shorthorn QC" } // Shorthorn QC
];

const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

const MapComponent = () => {
    const [position, setPosition] = useState([14.6526, 121.0276]); // Mendez Road, Baesa, Quezon City

    return (
        <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
            {/* Additional markers */}
            {additionalMarkers.map((marker, index) => (
                <Marker key={index} position={marker.position}>
                    <Popup>{marker.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
