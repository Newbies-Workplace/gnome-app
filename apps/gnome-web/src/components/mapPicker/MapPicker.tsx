import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLng } from "leaflet"; // Import `icon` from Leaflet
import MapPin from "../images/Map pin.svg"; // Import your custom pin SVG

interface MapPickerProps {
  defaultPosition: { lat: number; lng: number };
  onPositionChange: (position: { lat: number; lng: number }) => void;
}

export const MapPicker: React.FC<MapPickerProps> = ({
  defaultPosition,
  onPositionChange,
}) => {
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  // Create a custom icon for the marker
  const customIcon = icon({
    iconUrl: MapPin, // Path to your custom pin SVG
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 40], // Anchor point of the icon (center bottom)
  });

  // biome-ignore lint/correctness/noNestedComponentDefinitions: <explanation>
  const MapClickHandler = () => {
    useMapEvents({
      click: (e: { latlng: LatLng }) => {
        setMarkerPosition(e.latlng); // Update marker position on map click
        onPositionChange(e.latlng); // Notify parent component of the new position
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96 w-3/4 rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
      />
      <MapClickHandler />
      <Marker position={markerPosition} icon={customIcon}>
        <Popup>
          Wybrana lokalizacja: <br />
          {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
