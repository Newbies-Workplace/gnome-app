import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGnomeStore } from "@/store/useGnomeStore";

function GnomeAdd() {
  const navigate = useNavigate();
  const { addGnome } = useGnomeStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [funFact, setFunFact] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGnome = {
      id: Date.now().toString(), // tymczasowe ID, backend może nadpisać
      name,
      description,
      location,
      funFact,
      imageUrl: "",
      districtId: null,
      creationDate: new Date().toISOString(),
    };

    await addGnome(newGnome);
    navigate("/gnomes");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white p-6 flex flex-col gap-4 font-Afacad max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Dodaj nowego krasnala</h2>

      <label className="flex flex-col gap-2">
        Nazwa:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
      </label>

      <label className="flex flex-col gap-2">
        Opis:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
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
          className="flex-1 bg-primary-color text-white rounded-2xl"
        >
          Dodaj krasnala
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex-1 bg-gray-600 text-white rounded-2xl hover:bg-white/10"
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}

export default GnomeAdd;
