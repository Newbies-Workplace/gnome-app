import backgroundImage from "@/assets/images/background.png";
import MapComponent from "@/components/mapComponent";

export default function AdminPage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
        <MapComponent />
      </div>
    </div>
  );
}
