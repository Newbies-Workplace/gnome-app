// src/components/GnomesList.tsx
import { useEffect } from "react";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item";
import { useGnomeStore } from "@/store/useGnomeStore";

const GnomesList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();

  useEffect(() => {
    fetchGnomes();
  }, [fetchGnomes]);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!gnomes || gnomes.length === 0) {
    return <p>Brak krasnali do wyświetlenia</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {gnomes.map((gnome) => (
        <Item key={gnome.id} className="p-4 bg-gray-700 rounded">
          <div className="flex items-center">
            <img
              src={gnome.imageUrl || PlaceHolder}
              alt={gnome.name}
              onError={(e) => (e.currentTarget.src = PlaceHolder)}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="ml-4">
              <div className="text-white font-bold">{gnome.name}</div>
              <div className="text-gray-300 text-sm">{gnome.districtId}</div>
            </div>
          </div>
        </Item>
      ))}
    </div>
  );
};

export default GnomesList;
