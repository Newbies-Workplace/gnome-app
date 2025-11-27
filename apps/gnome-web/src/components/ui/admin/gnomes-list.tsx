import { useEffect } from "react";
import { Link } from "react-router-dom";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item";
import { useGnomeStore } from "@/store/useGnomeStore";

const GnomesList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();

  useEffect(() => {
    fetchGnomes();
  }, [fetchGnomes]);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!gnomes || gnomes.length === 0)
    return <p>Brak krasnali do wyświetlenia</p>;

  return (
    <div className="flex flex-col gap-4">
      {gnomes.map((gnome) => (
        <Link key={gnome.id} to={`/admin/gnomes/${gnome.id}`}>
          <Item className="p-4 rounded-4xl hover:bg-white/10 cursor-pointer">
            <div className="flex items-center">
              <img
                src={gnome.imageUrl || PlaceHolder}
                alt={gnome.name}
                onError={(e) => (e.currentTarget.src = PlaceHolder)}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <div className="text-white font-bold text-lg">{gnome.name}</div>
                <div className="text-gray-300 text-sm">{gnome.districtId}</div>
              </div>
            </div>
          </Item>
        </Link>
      ))}
    </div>
  );
};

export default GnomesList;
