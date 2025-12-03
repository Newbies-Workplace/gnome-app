import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BuildsIcon from "@/assets/icons/builds-icon.svg";
import EventsIcon from "@/assets/icons/events-icon.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
import MarkerIcon from "@/assets/icons/mark-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import backgroundImage from "@/assets/images/background.png";
import { MapStyle } from "@/components/map-styles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  if (loadError) {
    console.error("Error while loading google map:", loadError);
  }

  const { logout } = useAuthStore();
  const location = useLocation();

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: true,
    streetViewControl: true,
    zoomControl: true,
    styles: MapStyle,
  };

  const currentTab = (() => {
    if (location.pathname.startsWith("/admin/users")) return "users";
    if (location.pathname.startsWith("/admin/builds")) return "builds";
    if (location.pathname.startsWith("/admin/events")) return "events";
    return "gnomes"; // default tab
  })();

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full p-4 flex justify-between items-center bg-transparent">
        <div className="flex gap-4">
          <button className="bg-primary-gray text-white text-xl font-Afacad px-6 py-2 rounded-4xl hover:opacity-90 transition">
            Główna
          </button>
          <button
            onClick={logout}
            className="bg-primary-color text-white text-xl font-Afacad px-6 py-2 rounded-4xl hover:opacity-90 transition"
          >
            Wyloguj
          </button>
        </div>
      </div>
      <div className="flex flex-1 h-0 p-4 gap-4">
        <div className="w-3/4 h-full">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 51.105, lng: 17.038 }}
              zoom={12}
              options={mapOptions}
              onClick={(e) => {
                const lat = e.latLng?.lat();
                const lng = e.latLng?.lng();
                if (lat && lng && currentTab === "gnomes") {
                  setSelectedPosition({ lat, lng });
                }
              }}
            >
              {selectedPosition && (
                <Marker
                  position={selectedPosition}
                  icon={{
                    url: MarkerIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              )}
            </GoogleMap>
          )}
        </div>
        <div className="w-1/4 h-full bg-primary-gray flex flex-col">
          <Tabs value={currentTab} className="bg-primary-gray p-2 m-2">
            <TabsList className="grid grid-cols-4 gap-2 p-2 w-full bg-primary-gray">
              <TabsTrigger value="gnomes" className="rounded-4xl">
                <NavLink to="/admin">
                  <img src={GnomeIcon} alt="gnome" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="builds" className="rounded-4xl">
                <NavLink to="/admin/builds">
                  <img src={BuildsIcon} alt="builds" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="events" className="rounded-4xl">
                <NavLink to="/admin/events">
                  <img src={EventsIcon} alt="events" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="users" className="rounded-4xl">
                <NavLink to="/admin/users">
                  <img src={UsersIcon} alt="users" />
                </NavLink>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Podstrony */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet context={{ selectedPosition }} />
          </div>
        </div>
      </div>
    </div>
  );
}
