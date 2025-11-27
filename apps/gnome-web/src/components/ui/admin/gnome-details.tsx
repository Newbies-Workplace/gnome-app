import { useNavigate, useParams } from "react-router-dom";
import PlaceHolder from "@/assets/images/placeholder.png";
import { useGnomeStore } from "@/store/useGnomeStore";

function GnomeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes } = useGnomeStore();

  const gnome = gnomes.find((g) => g.id.toString() === id);

  if (!gnome) {
    return <p className="text-white">Nie znaleziono krasnala o ID {id}</p>;
  }

  return (
    <div className="text-white p-4">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 bg-primary-color px-4 py-2 rounded-2xl text-white"
      >
        ←
      </button>

      <h2 className="text-2xl font-bold">{gnome.name}</h2>
      <img
        src={gnome.imageUrl || PlaceHolder}
        alt={gnome.name}
        className="w-32 h-32 object-cover rounded mt-4"
      />
      <p className="mt-2">Dzielnica: {gnome.districtId}</p>
      <p className="mt-2">Opis: {gnome.description || "Brak opisu"}</p>
    </div>
  );
}

export default GnomeDetail;
