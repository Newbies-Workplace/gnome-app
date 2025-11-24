import { GoogleMap, LoadScript } from "@react-google-maps/api";
import backgroundImage from "@/assets/images/background.png";
import { MapStyle } from "@/components/map-styles";

export default function AdminPage() {
  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: true,
    streetViewControl: true,
    zoomControl: true,
    styles: MapStyle,
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex">
        <div className="p-4 w-3/4 h-screen">
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 51.105, lng: 17.038 }}
              zoom={12}
              options={mapOptions}
            />
          </LoadScript>
        </div>
        <div className="p-4 w-1/4 h-screen">{/* admin panel */}</div>
      </div>
    </div>
  );
}
