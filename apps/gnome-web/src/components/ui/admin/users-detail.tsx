import BerryIcon from "@/assets/icons/berry-icon.svg";
import BlockIcon from "@/assets/icons/block-icon.svg";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import DeleteIcon from "@/assets/icons/delete-icon.svg";
import GreenTeam from "@/assets/icons/green-team.svg";
import PlusIcon from "@/assets/icons/plus-icon.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import BuildPlaceHolder from "@/assets/images/placeholder.png";
import GnomeAvatar from "@/assets/images/placeholder-user.png";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function UsersDetail() {
  return (
    <div className="overflow-y-auto flex flex-col gap-2">
      <div className="flex flex-1 h-0 p-4 gap-4">
        <div className="w-1/4">
          <img className="w-full" src={GnomeAvatar} alt="Avatar" />
        </div>
        <Item>
          <div className="flex flex-col gap-2">
            <ItemContent>
              <ItemTitle className="text-2xl text-white font-Afacad font-bold">
                Jackowy Wróbel
              </ItemTitle>
            </ItemContent>
            <div>
              <img src={GreenTeam} alt="Green Team" />
            </div>
          </div>
        </Item>
      </div>
      <div className="flex flex-col gap-2 ">
        {/* Statystyki */}
        <div className="flex flex-row w-full gap-4">
          {/* Sekcja 3/4 */}
          <div className="w-3/4 flex items-center justify-between px-4 py-2 rounded-4xl border border-black text-2xl text-white font-Afacad">
            <div className="flex items-center gap-2">
              <img src={BerryIcon} alt="berry" className="h-10 w-10" />
              <span>12</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={StoneIcon} alt="stone" className="h-10 w-10" />
              <span>10</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={WoodIcon} alt="wood" className="h-10 w-10 " />
              <span>5</span>
            </div>
          </div>

          {/* Sekcja 1/4 */}
          <div className="w-1/4 flex">
            <Button className="h-full w-full flex items-center justify-center text-4xl leading-none border border-black rounded-4xl bg-primary-gray">
              <img src={PlusIcon} alt="Plus" />
            </Button>
          </div>
        </div>
        {/* Przyciski */}

        <div className="flex flex-col gap-2 w-full">
          <Button className="bg-primary-color rounded-4xl">
            <img src={BlockIcon} alt="block" />
            Zbanuj użytkownika
          </Button>
          <Button className="bg-primary-color rounded-4xl">
            <img src={DeleteIcon} alt="delete" />
            Usuń budowle użytkownika
          </Button>
        </div>

        {/* Budowle użytkownika */}
        <div className="flex flex-col gap-4">
          <div className="text-white text-left font-Afacad text-lg">
            Budowle:
          </div>
          <div className="flex w-full h-full items-center text-left text-white font-Afacad">
            <img
              src={BuildPlaceHolder}
              alt="user"
              className="w-16 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex flex-col ml-4 h-16 justify-between flex-1">
              <div className="text-white font-bold text-lg leading-tight">
                Strażnicza
              </div>
              <div className="flex flex-row justify-end items-center">
                <img src={ClockIcon} alt="clock" className="w-4 h-4 mr-1" />
                <span className="text-gray-300 text-sm">15h</span>
              </div>
              <div className="text-gray-400 text-xs leading-tight">
                Psie pole
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
