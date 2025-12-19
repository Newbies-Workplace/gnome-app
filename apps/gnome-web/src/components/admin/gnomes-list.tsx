import { Link, useOutletContext } from "react-router-dom";
import PlaceHolder from "@/assets/images/gnomeplaceholder.svg";
import { Item } from "@/components/ui/item.tsx";
import { useDistrictStore } from "@/store/useDistrictStore.ts";
import { useGnomeStore } from "@/store/useGnomeStore.ts";

type OutletContextType = {
  onGnomeMarkerClick: (gnomeId: string) => void;
};

type GnomesListProps = {
  search?: string;
};

const GnomesList = ({ search = "" }: GnomesListProps) => {
  const { gnomes, loading } = useGnomeStore();
  const { districts } = useDistrictStore();
  const { onGnomeMarkerClick } = useOutletContext<OutletContextType>();

  if (loading) return <p>Ładowanie...</p>;

  if (!gnomes || gnomes.length === 0) {
    return (
      <div className="text-white text-lg text-center">
        Brak krasnali do wyświetlenia
      </div>
    );
  }

  const filtered = gnomes.filter((gnome) =>
    gnome.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (filtered.length === 0) {
    return (
      <div className="text-white text-lg text-center">
        Brak wyników dla "{search}"
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      {filtered.map((gnome) => {
        const district = districts.find((d) => d.id === gnome.districtId);

        return (
          <Link
            key={gnome.id}
            to={`/admin/gnomes/${gnome.id}`}
            onClick={() => onGnomeMarkerClick(gnome.id)}
          >
            <Item className="hover:bg-white/10" size={"sm"}>
              <div className="flex items-center gap-4">
                <img
                  src={gnome.pictureUrl || PlaceHolder}
                  alt={gnome.name}
                  onError={(e) => (e.currentTarget.src = PlaceHolder)}
                  className="w-16 h-16 object-cover rounded-sm"
                />
                <div className="flex flex-col">
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
