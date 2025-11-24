import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import backgroundImage from "@/assets/images/background.png";
import { MapStyle } from "@/components/map-styles";

export default function AdminPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    console.error("Błąd ładowania Google Maps:", loadError);
  }

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: true,
    streetViewControl: true,
    zoomControl: true,
    styles: MapStyle,
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full p-4 flex justify-between items-center bg-transparent">
        <div className="flex gap-4">
          <button className="bg-primary-gray text-white text-xl font-Afacad px-6 py-2 rounded-3xl hover:opacity-90 transition">
            Główna
          </button>
          <button className="bg-primary-color text-white text-xl font-Afacad px-6 py-2 rounded-3xl hover:opacity-90 transition">
            Wyloguj
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        <div className="w-3/4 h-full p-4">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 51.105, lng: 17.038 }}
              zoom={12}
              options={mapOptions}
            />
          )}
        </div>
        <div className="w-1/4 h-full p-4">{/* admin panel */}</div>
      </div>
    </div>
  );
}
