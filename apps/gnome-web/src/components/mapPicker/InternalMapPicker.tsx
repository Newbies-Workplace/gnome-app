"use client";

import { LatLngLiteral, icon } from "leaflet";
import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
// @ts-ignore
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "../../lib/utils.ts";
import { MapPicker } from "./MapPicker";

type MapPickerProps = {
  className?: string;
};

const InteractiveMapPicker: React.FC<MapPickerProps> = ({ className }) => {
  const defaultPosition: LatLngLiteral = { lat: 51.1079, lng: 17.0385 }; // Default position (Wrocław, Poland)
  const [selectedPosition, setSelectedPosition] =
    useState<LatLngLiteral | null>(null);

  const handlePositionChange = (position: LatLngLiteral) => {
    setSelectedPosition(position);
  };

  return (
    <div className="">
      <MapContainer
        className={cn(
          "rounded-2xl w-[300px] h-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] sm:h-[250px] md:h-[300px] lg:h-[400px]",
          className,
        )}
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        />
        <MapMarker value={selectedPosition} onChange={handlePositionChange} />
      </MapContainer>
      <div className="text-center mt-4">
        {selectedPosition && (
          <p className="text-[#B3B3B3] text-bold">
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
