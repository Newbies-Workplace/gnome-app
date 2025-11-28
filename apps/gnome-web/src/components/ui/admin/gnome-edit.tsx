import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGnomeStore } from "@/store/useGnomeStore";

function GnomeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes, updateGnome } = useGnomeStore();

  const gnome = gnomes.find((g) => g.id.toString() === id);

  const [name, setName] = useState(gnome?.name || "");
  const [description, setDescription] = useState(gnome?.description || "");
  const [location, setLocation] = useState(gnome?.location || "");
  const [funFact, setFunFact] = useState(gnome?.funFact || "");

  if (!gnome) {
    return <p className="text-white">Nie znaleziono krasnala o ID {id}</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateGnome(gnome.id, {
      name,
      description,
      location,
      funFact,
    });
    navigate(`/gnomes/${id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white p-6 flex flex-col gap-4 font-Afacad max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Edytuj krasnala</h2>

      <label className="flex flex-col gap-2">
        Nazwa:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        Opis:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        Lokalizacja:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        Ciekawostka:
        <input
          type="text"
          value={funFact}
          onChange={(e) => setFunFact(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
      </label>

      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          onClick={() => navigate("/admin")}
          className="flex-1 bg-primary-color text-white rounded-2xl"
        >
          Zapisz zmiany
        </Button>
        <Button
          type="button"
          onClick={() => navigate(`/admin/gnomes/${id}`)}
          className="flex-1 bg-gray-600 text-white rounded-2xl"
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}

export default GnomeEdit;
