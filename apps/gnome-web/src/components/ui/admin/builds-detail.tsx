import ClockIcon from "@/assets/icons/clock-icon.svg";
import GreenTeam from "@/assets/icons/green-team.svg";
import Line from "@/assets/icons/line.svg";
import Bar from "@/assets/icons/placeholder-bar.svg";
import GnomeAvatar from "@/assets/images/placeholder-user.png";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function BuildsDetail() {
  return (
    <div className="overflow-hidden flex flex-col gap-2">
      <div className="flex p-4 gap-4">
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
      <Item className="flex flex-col gap-2">
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
      <div>
        <img src={Line} alt="line" className="w-full" />
      </div>
      <Item className="flex flex-col gap-4">
        <ItemContent className="w-full flex flex-col">
          <ItemDescription className="font-Afacad text-white text-lg">
            Historia:
          </ItemDescription>

          {/* Lista powiadomień */}
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
          <ItemContent className="flex flex-row gap-4 w-full hover:bg-white/10 rounded-4xl">
            <Item className="flex flex-row justify-between gap-4 w-full">
              <div>
                <img className="w-full" src={GnomeAvatar} alt="Avatar" />
              </div>
              <ItemContent>
                <ItemDescription className="text-2xl text-white font-Afacad">
                  Autor2
                </ItemDescription>
                <div>
                  <ItemDescription className="text-lg text-white font-Afacad ">
                    Zbudowano
                  </ItemDescription>
                </div>
              </ItemContent>
              <ItemContent>
                <div className="text-lg text-white font-Afacad">22.09.2025</div>
              </ItemContent>
            </Item>
          </ItemContent>
        </ItemContent>
      </Item>
    </div>
  );
}
