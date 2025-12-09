import { Link } from "react-router-dom";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import BuildPlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item.tsx";
import { convertHealthToRemainingTime } from "@/lib/convert-health-to-remaining-time.ts";
import { useBuildStore } from "@/store/useBuildStore.ts";

const BuildsList = () => {
  const { getBuildingsWithOwnerName, loading, error } = useBuildStore();

  const buildings = getBuildingsWithOwnerName();

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!buildings || buildings.length === 0)
    return <p>Brak budowli do wyświetlenia</p>;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {buildings.map((build) => (
        <Link key={build.id} to={`/admin/buildings/${build.id}`}>
          <Item className="hover:bg-white/10" size={"sm"}>
            <div className="flex w-full h-full items-center text-left text-white font-Afacad">
              <img
                src={BuildPlaceHolder}
                alt="user"
                className="w-16 h-16 object-cover rounded flex-shrink-0"
              />
              <div className="flex flex-col ml-4 h-16 justify-between flex-1">
                <div className="text-white font-bold text-lg leading-tight">
                  {build.type}
                </div>

                <div className="flex flex-row justify-end items-center">
                  <img src={ClockIcon} alt="clock" className="w-4 h-4 mr-1" />
                  <div className="text-gray-300 text-sm">
                    {convertHealthToRemainingTime(build.health)}
                  </div>
                </div>

                <div className="text-gray-400 text-xs leading-tight">
                  {build.ownerName}
                </div>
              </div>
            </div>
          </Item>
        </Link>
      ))}
    </div>
  );
};

export default BuildsList;
