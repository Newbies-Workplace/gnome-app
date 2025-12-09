import { Link, useOutletContext } from "react-router-dom";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item.tsx";
import { useDistrictStore } from "@/store/useDistrictStore.ts";
import { useGnomeStore } from "@/store/useGnomeStore.ts";

type OutletContextType = {
  onGnomeMarkerClick: (gnomeId: string) => void;
};

const GnomesList = () => {
  const { gnomes, loading, error } = useGnomeStore();
  const { districts } = useDistrictStore();
  const { onGnomeMarkerClick } = useOutletContext<OutletContextType>();

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!gnomes || gnomes.length === 0)
    return <p>Brak krasnali do wyświetlenia</p>;

  return (
    <div className="flex flex-col overflow-y-auto">
      {gnomes.map((gnome) => {
        const district = districts.find((d) => d.id === gnome.districtId);

        return (
          <Link
            key={gnome.id}
            to={`/admin/gnomes/${gnome.id}`}
            onClick={() => onGnomeMarkerClick(gnome.id)}
          >
            <Item className="hover:bg-white/10" size={"sm"}>
              <div className="flex items-center">
                <img
                  src={gnome.pictureUrl || PlaceHolder}
                  alt={gnome.name}
                  onError={(e) => (e.currentTarget.src = PlaceHolder)}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col ml-4">
                  <div className="text-white font-bold text-lg">
                    {gnome.name}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {district ? district.name : "Nieznana dzielnica"}
                  </div>
                </div>
              </div>
            </Item>
          </Link>
        );
      })}
    </div>
  );
};

export default GnomesList;
