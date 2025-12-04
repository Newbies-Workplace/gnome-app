import GnomeAvatar from "@/assets/images/placeholder-user.png";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

export default function BuildsHistoryList() {
  return (
    <ItemContent className="flex flex-row gap-4 w-full hover:bg-white/10 rounded-4xl">
      <Item className="flex flex-row justify-between gap-4 w-full">
        <div>
          <img className="w-full" src={GnomeAvatar} alt="Avatar" />
        </div>
        <ItemContent>
          <ItemDescription className="text-2xl text-white font-Afacad">
            Autor3
          </ItemDescription>
          <div>
            <ItemDescription className="text-lg text-white font-Afacad ">
              Zaatakowano
            </ItemDescription>
          </div>
        </ItemContent>
        <ItemContent>
          <div className="text-lg text-white font-Afacad">23.09.2025</div>
        </ItemContent>
      </Item>
    </ItemContent>
  );
}
