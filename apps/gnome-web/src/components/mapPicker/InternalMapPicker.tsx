"use client";

import { LatLngLiteral, icon } from "leaflet";
import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
// @ts-ignore
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const InteractiveMapPicker: React.FC = () => {
  const defaultPosition: LatLngLiteral = { lat: 51.1079, lng: 17.0385 }; // Default position (Wrocław, Poland)
  const [selectedPosition, setSelectedPosition] =
    useState<LatLngLiteral | null>(null);

  const handlePositionChange = (position: LatLngLiteral) => {
    setSelectedPosition(position);
  };

  return (
    <div className="size-full">
      <MapContainer
        className="h-96 rounded-2xl"
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapMarker value={selectedPosition} onChange={handlePositionChange} />
      </MapContainer>
      <div className="text-center mt-4">
        {selectedPosition && (
          <p className="text-lg">
            Wybrana lokalizacja: {selectedPosition.lat.toFixed(4)},{" "}
            {selectedPosition.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
};

interface MapMarkerProps {
  value?: LatLngLiteral | null;
  onChange: (value: LatLngLiteral) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ value, onChange }) => {
  // Create a custom icon for the marker
  const customIcon = icon({
    iconUrl: "../src/images/Map_pin.svg", // Path to your custom pin SVG
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 40], // Anchor point of the icon (center bottom)
  });

  useMapEvents({
    click(e) {
      onChange(e.latlng); // Update position on map click
    },
  });

  if (!value) {
    return null; // Render nothing if no position is selected
  }

  return <Marker position={value} icon={customIcon} />;
};

export default InteractiveMapPicker;
