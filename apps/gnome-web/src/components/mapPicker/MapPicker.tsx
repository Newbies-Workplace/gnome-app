import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// -------Use when import to file---------
// import { MapPicker } from "../components/mapPicker/MapPicker";
// import { useState } from "react";

// const defaultPosition = { lat: 51.1079, lng: 17.0385 }; // Default position (Wrocław, Poland)
// const [selectedPosition, setSelectedPosition] = useState(defaultPosition);

// const handlePositionChange = (position: { lat: number; lng: number }) => {
//   setSelectedPosition(position);
// };

// <MapPicker
//   defaultPosition={defaultPosition}
//   onPositionChange={handlePositionChange}
// />

interface MapPickerProps {
  defaultPosition: { lat: number; lng: number };
  onPositionChange: (position: { lat: number; lng: number }) => void;
}

export const MapPicker: React.FC<MapPickerProps> = ({
  defaultPosition,
  onPositionChange,
}) => {
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  // Component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setMarkerPosition(e.latlng); // Update marker position on map click
        onPositionChange(e.latlng); // Notify parent component of the new position
      },
    });
    return null; // This component does not render anything
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96 w-3/4 rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      <Marker position={markerPosition}>
        <Popup>
          Wybrana lokalizacja: <br />
          {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
