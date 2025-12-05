import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  onGnomeMarkerClick: (gnomeId: string | number) => void;
};

const GnomesList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();
  const { districts, fetchDistricts } = useDistrictStore();
  const { onGnomeMarkerClick } = useOutletContext<OutletContextType>();

  useEffect(() => {
    fetchGnomes();
    fetchDistricts();
  }, [fetchGnomes, fetchDistricts]);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!gnomes || gnomes.length === 0)
    return <p>Brak krasnali do wyświetlenia</p>;

  return (
    <div className="flex flex-col">
      {gnomes.map((gnome) => {
        const district = districts.find((d) => d.id === gnome.districtId);

        return (
          <Link
            key={gnome.id}
            to={`/admin/gnomes/${gnome.id}`}
            onClick={() => onGnomeMarkerClick(gnome.id)}
          >
            <Item className="rounded-4xl hover:bg-white/10 cursor-pointer">
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
