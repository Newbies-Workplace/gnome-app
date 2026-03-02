import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import BuildingsIcon from "@/assets/icons/buildings-icon.svg";
import EventsIcon from "@/assets/icons/events-icon.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
import GnomePinIcon from "@/assets/icons/gnome-pin-icon.svg";
import MarkerIcon from "@/assets/icons/mark-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import backgroundImage from "@/assets/images/background.png";
import AdminToolbar from "@/components/admin/admin-toolbar";
import MapOptions from "@/components/admin/map-options";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildingClusterRenderer } from "@/lib/building-cluster-renderer.tsx";
import { gnomeClusterRenderer } from "@/lib/gnome-cluster-renderer.tsx";
import { MapStyle } from "@/lib/map-styles.ts";
import { points } from "@/lib/wroclaw-coords";
import { useBuildStore } from "@/store/useBuildStore.ts";
import { useDistrictStore } from "@/store/useDistrictStore.ts";
import { useGnomeStore } from "@/store/useGnomeStore";

const defaultCenter = { lat: 51.105, lng: 17.038 };
const defaultZoom = 12;

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

  const gnomeClustererRef = useRef<MarkerClusterer | null>(null);
  const buildingClustererRef = useRef<MarkerClusterer | null>(null);

  if (loadError) {
    console.error("Error while loading google map:", loadError);
  }

  const location = useLocation();
  const navigate = useNavigate();
  const { gnomes, fetchGnomes } = useGnomeStore();
  const { fetchDistricts } = useDistrictStore();
  const { buildings, fetchBuildings } = useBuildStore();

  useEffect(() => {
    fetchGnomes();
    fetchDistricts();
    fetchBuildings();
  }, []);

  const onGnomeMarkerClick = (gnomeId: string) => {
    const gnome = gnomes.find((g) => g.id === gnomeId);
    if (mapRef && gnome) {
      const position = { lat: gnome.latitude, lng: gnome.longitude };
      mapRef.panTo(position);
      mapRef.setCenter(position);
      mapRef.setZoom(18);
    }
    navigate(`/admin/gnomes/${gnomeId}`);
  };

  const onBuildingMarkerClick = (buildingId: string) => {
    const building = buildings.find((b) => b.id === buildingId);
    if (mapRef && building) {
      const position = { lat: building.latitude, lng: building.longitude };
      mapRef.panTo(position);
      mapRef.setCenter(position);
      mapRef.setZoom(18);
    }
    navigate(`/admin/buildings/${buildingId}`);
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  useEffect(() => {
    if (!mapRef) return;
    if (
      location.pathname === "/admin" ||
      location.pathname === "/admin/buildings"
    ) {
      mapRef.panTo(defaultCenter);
      mapRef.setZoom(defaultZoom);
    }
  }, [location.pathname, mapRef]);

  const effectiveSelectedPosition =
    location.pathname === "/admin/gnomes/add" ? selectedPosition : null;

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: true,
    streetViewControl: true,
    zoomControl: true,
    styles: MapStyle,
  };

  const currentTab = (() => {
    if (location.pathname.startsWith("/admin/users")) return "users";
    if (location.pathname.startsWith("/admin/buildings")) return "buildings";
    if (location.pathname.startsWith("/admin/events")) return "events";
    return "gnomes"; // default
  })();

  const [filters, setFilters] = useState({
    gnomesVisible: true,
    buildingsVisible: true,
  });

  useEffect(() => {
    if (!mapRef) return;

    if (gnomeClustererRef.current) {
      gnomeClustererRef.current.clearMarkers();
      gnomeClustererRef.current = null;
    }
    if (buildingClustererRef.current) {
      buildingClustererRef.current.clearMarkers();
      buildingClustererRef.current = null;
    }

    if (filters.gnomesVisible && Array.isArray(gnomes)) {
      const markers = gnomes.map((gnome) => {
        const marker = new google.maps.Marker({
          position: { lat: gnome.latitude, lng: gnome.longitude },
          icon: { url: GnomePinIcon, scaledSize: new google.maps.Size(40, 40) },
        });
        marker.addListener("click", () => onGnomeMarkerClick(gnome.id));
        return marker;
      });

      gnomeClustererRef.current = new MarkerClusterer({
        markers,
        map: mapRef,
        renderer: gnomeClusterRenderer,
      });
    }

    if (filters.buildingsVisible && Array.isArray(buildings)) {
      const markers = buildings.map((building) => {
        const marker = new google.maps.Marker({
          position: { lat: building.latitude, lng: building.longitude },
          icon: {
            url: BuildingsIcon,
            scaledSize: new google.maps.Size(40, 40),
          },
        });
        marker.addListener("click", () => onBuildingMarkerClick(building.id));
        return marker;
      });

      buildingClustererRef.current = new MarkerClusterer({
        markers,
        map: mapRef,
        renderer: buildingClusterRenderer,
      });
    }
  }, [filters, gnomes, buildings, mapRef]);

  return (
    <div
      className="h-screen w-screen p-2 gap-2 bg-cover bg-center bg-no-repeat flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="w-full md:flex-1 flex items-stretch">
          <AdminToolbar />
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[300px] md:h-full">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={defaultCenter}
              zoom={defaultZoom}
              options={mapOptions}
              onLoad={onMapLoad}
              onClick={(e) => {
                if (location.pathname === "/admin/gnomes/add") {
                  const lat = e.latLng?.lat();
                  const lng = e.latLng?.lng();
                  if (typeof lat === "number" && typeof lng === "number") {
                    setSelectedPosition({ lat, lng });
                  }
                }
              }}
            >
              {effectiveSelectedPosition && (
                <Marker
                  position={effectiveSelectedPosition}
                  icon={{
                    url: MarkerIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              )}
              <Polygon
                paths={points}
                options={{
                  strokeColor: "#8a5416ff",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  fillOpacity: 0,
                  clickable: false,
                }}
              />
            </GoogleMap>
          )}
          <div className="absolute bottom-4 left-4 z-10">
            <MapOptions filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-full md:w-[420px] min-w-[300px] bg-primary-gray rounded-2xl h-16 flex items-center">
          <Tabs value={currentTab} className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 p-2 w-full bg-primary-gray rounded-4xl h-16 items-center">
              <TabsTrigger value="gnomes" asChild>
                <NavLink to="/admin">
                  <img src={GnomeIcon} alt="gnome" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger value="buildings" asChild>
                <NavLink to="/admin/buildings">
                  <img src={BuildingsIcon} alt="buildings" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger value="events" asChild>
                <NavLink to="/admin/events">
                  <img src={EventsIcon} alt="events" />
                </NavLink>
              </TabsTrigger>
              <TabsTrigger value="users" asChild>
                <NavLink to="/admin/users">
                  <img src={UsersIcon} alt="users" />
                </NavLink>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="w-full h-full md:w-[420px] min-w-[300px] bg-primary-gray flex flex-col p-2 rounded-2xl overflow-auto">
          <Outlet
            context={{
              selectedPosition: effectiveSelectedPosition,
              onGnomeMarkerClick,
              onBuildingMarkerClick,
            }}
          />
        </div>
      </div>
    </div>
  );
}
