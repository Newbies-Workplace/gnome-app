import GnomeAvatar from "@/assets/images/placeholder-user.png";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item.tsx";
import { useBuildStore } from "@/store/useBuildStore.ts";

const BuildingsHistoryList = () => {
  const { getBuildingsWithOwnerName, loading, error } = useBuildStore();

  const buildings = getBuildingsWithOwnerName();

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!buildings || buildings.length === 0)
    return <p>Brak budowli do wyświetlenia</p>;

  return (
    <div className="flex flex-row gap-2">
      <ItemContent className="gap-4 w-full hover:bg-white/10 rounded-4xl">
        {buildings.map((build) => (
          <Item key={build.id} className="justify-between w-full" size={"sm"}>
            <div>
              <img className="w-full" src={GnomeAvatar} alt="Avatar" />
            </div>
            <ItemContent>
              <ItemDescription className="text-2xl text-white font-Afacad">
                Autor
              </ItemDescription>
              <div>
                <ItemDescription className="text-lg text-white font-Afacad ">
                  Zaatakowano
                </ItemDescription>
              </div>
            </ItemContent>
            <ItemContent>
              <div className="text-lg text-white font-Afacad">12.01.2000</div>
            </ItemContent>
          </Item>
        ))}
      </ItemContent>
    </div>
  );
};
export default BuildingsHistoryList;
