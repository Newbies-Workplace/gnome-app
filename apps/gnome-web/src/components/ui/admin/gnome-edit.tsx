import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import placeholderImage from "@/assets/images/placeholder.png";
import { Button } from "@/components/ui/button";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  selectedPosition: { lat: number; lng: number } | null;
};

function GnomeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes, updateGnome } = useGnomeStore();
  const { selectedPosition } = useOutletContext<OutletContextType>();

  const gnome = gnomes.find((g) => g.id.toString() === id);

  const [name, setName] = useState(gnome?.name || "");
  const [description, setDescription] = useState(gnome?.description || "");
  const [location, setLocation] = useState(gnome?.location || "");
  const [funFact, setFunFact] = useState(gnome?.funFact || "");
  const [latitude, setLatitude] = useState(gnome?.latitude || 0);
  const [longitude, setLongitude] = useState(gnome?.longitude || 0);
  const [preview, setPreview] = useState<string | null>(
    gnome?.pictureUrl || null,
  );

  useEffect(() => {
    if (selectedPosition) {
      setLatitude(selectedPosition.lat);
      setLongitude(selectedPosition.lng);
    }
  }, [selectedPosition]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gnome) return;
    await updateGnome(gnome.id, {
      name,
      description,
      location,
      funFact,
      latitude,
      longitude,
      pictureUrl: preview || "",
    });
    navigate("/admin");
  };

  return (
    <>
      {!gnome ? (
        <p className="text-white">Nie znaleziono krasnala o ID {id}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="text-white p-6 flex flex-col gap-4 font-Afacad max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Edytuj krasnala</h2>

          <div className="flex flex-row items-stretch gap-4">
            <div className="relative w-32 h-40 rounded overflow-hidden bg-gray-700">
              <img
                src={preview || placeholderImage}
                alt="Podgląd zdjęcia"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImage;
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex flex-col justify-between h-40 flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa"
                className="p-2 rounded bg-gray-800 text-white"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokalizacja (nazwa miejsca)"
                className="p-2 rounded bg-gray-800 text-white"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(parseFloat(e.target.value))}
                  placeholder="Latitude"
                  className="p-2 rounded bg-gray-800 text-white flex-1"
                />
                <input
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(parseFloat(e.target.value))}
                  placeholder="Longitude"
                  className="p-2 rounded bg-gray-800 text-white flex-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-2 rounded text-sm text-gray-300">
            <p>📍 Aktualne współrzędne:</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>

          <label className="flex flex-col gap-2">
            Opis:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Zapisz zmiany
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
      )}
    </>
  );
}

export default GnomeEdit;
