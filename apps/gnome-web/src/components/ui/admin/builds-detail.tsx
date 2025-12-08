import { useNavigate } from "react-router-dom";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import GoBack from "@/assets/icons/goBack-icon.svg";
import GreenTeam from "@/assets/icons/green-team.svg";
import Line from "@/assets/icons/line.svg";
import Bar from "@/assets/icons/placeholder-bar.svg";
import GnomeAvatar from "@/assets/images/placeholder-user.png";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import BuildsHistoryList from "./builds-history-list";

export default function BuildsDetail() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col gap-2 mx-4">
      <div className="flex flex-row gap-4 items-center">
        <Button
          className="bg-primary-gray"
          onClick={() => navigate("/admin/builds")}
        >
          <img src={GoBack} alt="goback" />
        </Button>

        <div className="text-white text-Afacad text-xl">Lista budowli</div>
      </div>
      <div className="flex p-4 gap-4 shrink-0">
        <div className="w-1/4">
          <img className="w-full" src={GnomeAvatar} alt="Avatar" />
        </div>
        <div className="flex w-3/4 flex-col">
          <Item>
            <ItemContent>
              <ItemTitle className="text-2xl text-bold text-white font-Afacad font-bold">
                Autor
              </ItemTitle>
              <div className="flex flex-col gap-0">
                <ItemDescription className="text-lg text-white font-Afacad font-bold">
                  Strażnicza
                </ItemDescription>
                <ItemDescription className="text-sm text-white font-Afacad">
                  Najprostrzy typ budowli, zwiększa obszar twojej drużyny
                </ItemDescription>
              </div>
            </ItemContent>
            <ItemContent>
              <img src={GreenTeam} alt="team" />
            </ItemContent>
          </Item>
        </div>
      </div>

      <Item className="flex flex-col gap-2 shrink-0">
        <ItemContent className="justify-between w-full flex flex-row">
          <ItemDescription className="text-lg text-white font-Afacad">
            Pozostały czas:
          </ItemDescription>
          <ItemDescription>
            <div className="flex flex-row gap-2">
              <img src={ClockIcon} alt="ClockIcon" className="size-8" />
              <div className="text-lg text-white font-Afacad">15h</div>
            </div>
          </ItemDescription>
        </ItemContent>

        <ItemContent className="w-full flex flex-col gap-4">
          <ItemDescription className="text-lg text-white font-Afacad">
            Wytrzymałość:
          </ItemDescription>
          <ItemDescription>
            <img src={Bar} alt="bar" className="w-full justify-center" />
          </ItemDescription>
        </ItemContent>
      </Item>

      <div className="shrink-0">
        <img src={Line} alt="line" className="w-full" />
      </div>

      <Item className="flex flex-col gap-4 flex-1 min-h-0">
        <ItemContent className="w-full flex flex-col flex-1 min-h-0">
          <ItemDescription className="font-Afacad text-white text-lg shrink-0">
            Historia:
          </ItemDescription>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
            <BuildsHistoryList />
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
