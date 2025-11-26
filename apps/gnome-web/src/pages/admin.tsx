import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BuildsIcon from "@/assets/icons/builds-icon.svg";
import EventsIcon from "@/assets/icons/events-icon.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
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
    if (location.pathname.endsWith("/users")) return "users";
    if (location.pathname.endsWith("/builds")) return "builds";
    if (location.pathname.endsWith("/events")) return "events";
    return "gnomes"; // default tab
  })();

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
          <button
            onClick={logout}
            className="bg-primary-color text-white text-xl font-Afacad px-6 py-2 rounded-3xl hover:opacity-90 transition"
          >
            Wyloguj
          </button>
        </div>
      </div>
      <div className="flex flex-grow p-4 gap-4">
        <div className="w-3/4 h-full">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 51.105, lng: 17.038 }}
              zoom={12}
              options={mapOptions}
            />
          )}
        </div>

        <div className="w-1/4 h-full bg-primary-gray rounded-4xl flex flex-col">
          <Tabs value={currentTab} className="bg-primary-gray rounded-4xl">
            <TabsList className="grid grid-cols-4 gap-2 p-2 w-full h-full bg-primary-gray rounded-4xl">
              <TabsTrigger value="gnomes">
                <NavLink to="/admin">
                  <img src={GnomeIcon} alt="gnome" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="builds">
                <NavLink to="/admin/builds">
                  <img src={BuildsIcon} alt="builds" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="events">
                <NavLink to="/admin/events">
                  <img src={EventsIcon} alt="events" />
                </NavLink>
              </TabsTrigger>

              <TabsTrigger value="users">
                <NavLink to="/admin/users">
                  <img src={UsersIcon} alt="users" />
                </NavLink>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {/* Podstrony */}
          <div className="flex-1 p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
