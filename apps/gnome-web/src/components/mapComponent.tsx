import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function MyMap() {
  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "50%", height: "100vh" }}
        center={{ lat: 51.105, lng: 17.038 }}
        zoom={12}
        options={mapOptions}
      />
    </LoadScript>
  );
}
