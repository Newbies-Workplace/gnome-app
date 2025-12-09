import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import BuildsIcon from "@/assets/icons/builds-icon.svg";
import EventsIcon from "@/assets/icons/events-icon.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
import GnomePinIcon from "@/assets/icons/gnome-pin-icon.svg";
import MarkerIcon from "@/assets/icons/mark-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import backgroundImage from "@/assets/images/background.png";
import AdminToolbar from "@/components/admin/admin-toolbar";
import MapOptions from "@/components/admin/map-options";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gnomeClusterRenderer } from "@/lib/gnome-cluster-renderer.tsx";
import { MapStyle } from "@/lib/map-styles.ts";
import { useBuildStore } from "@/store/useBuildStore.ts";
import { useDistrictStore } from "@/store/useDistrictStore.ts";
import { useGnomeStore } from "@/store/useGnomeStore";

export default function AdminPage() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null);

  if (loadError) {
    console.error("Error while loading google map:", loadError);
  }

  const location = useLocation();
  const navigate = useNavigate();
  const { gnomes, fetchGnomes } = useGnomeStore();
  const { fetchDistricts } = useDistrictStore();
  const { fetchBuildings, fetchUsers } = useBuildStore();

  useEffect(() => {
    fetchGnomes();
    fetchDistricts();
    fetchUsers();
    fetchBuildings();
  }, [fetchGnomes]);

  const onGnomeMarkerClick = (gnomeId: string) => {
    const gnome = gnomes.find((g) => g.id === gnomeId);
    if (mapRef && gnome) {
      mapRef.panTo({ lat: gnome.latitude, lng: gnome.longitude });
      mapRef.setZoom(16);
    }
    navigate(`/admin/gnomes/${gnomeId}`);
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: true,
    streetViewControl: true,
    zoomControl: true,
    styles: MapStyle,
  };

  const currentTab = (() => {
    if (location.pathname.startsWith("/admin/users")) return "users";
    if (location.pathname.startsWith("/admin/buildings")) return "builds";
    if (location.pathname.startsWith("/admin/events")) return "events";
    return "gnomes"; // default tab
  })();

  const [filters, setFilters] = useState({
    gnomesVisible: true,
    buildingsVisible: true,
  });

  useEffect(() => {
    if (!mapRef) return;

    if (clusterer) {
      clusterer.clearMarkers();
      setClusterer(null);
    }

    if (filters.gnomesVisible && Array.isArray(gnomes)) {
      const markers = gnomes.map((gnome) => {
        const marker = new google.maps.Marker({
          position: { lat: gnome.latitude, lng: gnome.longitude },
          icon: {
            url: GnomePinIcon,
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        marker.addListener("click", () => onGnomeMarkerClick(gnome.id));
        return marker;
      });

      const newClusterer = new MarkerClusterer({
        markers,
        map: mapRef,
        renderer: gnomeClusterRenderer,
      });
      setClusterer(newClusterer);
    }
  }, [filters.gnomesVisible, gnomes, mapRef]);

  return (
    <div
      className="h-screen w-screen p-2 gap-2 bg-cover bg-center bg-no-repeat flex flex-col min-w-[375px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="w-full md:flex-1 flex items-stretch">
          <AdminToolbar />
        </div>

        <div className="w-full md:w-[420px] min-w-[300px] bg-primary-gray rounded-2xl h-16 flex items-center">
          <Tabs value={currentTab} className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 p-2 w-full bg-primary-gray rounded-4xl h-16 items-center">
              <TabsTrigger
                value="gnomes"
                className="rounded-xl flex items-center justify-center h-full"
                asChild
              >
                <NavLink to="/admin">
                  <img src={GnomeIcon} alt="gnome" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger
                value="buildings"
                className="rounded-xl flex items-center justify-center h-full"
                asChild
              >
                <NavLink to="/admin/buildings">
                  <img src={BuildsIcon} alt="buildings" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="rounded-xl flex items-center justify-center h-full"
                asChild
              >
                <NavLink to="/admin/events">
                  <img src={EventsIcon} alt="events" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-xl flex items-center justify-center h-full"
                asChild
              >
                <NavLink to="/admin/users">
                  <img src={UsersIcon} alt="users" />
                </NavLink>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 flex-1 overflow-hidden">
        <div className="relative w-full md:flex-1 rounded-2xl overflow-hidden min-h-[300px]">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 51.105, lng: 17.038 }}
              zoom={12}
              options={mapOptions}
              onLoad={onMapLoad}
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
          <div className="absolute bottom-4 left-4 z-10">
            <MapOptions filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="w-full md:w-[420px] min-w-[300px] bg-primary-gray flex flex-col p-2 rounded-2xl overflow-auto">
          <Outlet context={{ selectedPosition, onGnomeMarkerClick }} />
        </div>
      </div>
    </div>
  );
}
