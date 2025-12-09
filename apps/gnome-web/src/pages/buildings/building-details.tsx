import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import GoBack from "@/assets/icons/goBack-icon.svg";
import GreenTeam from "@/assets/icons/green-team.svg";
import Line from "@/assets/icons/line.svg";
import Bar from "@/assets/icons/placeholder-bar.svg";
import BuildingsHistoryList from "@/components/admin/buildings-history-list";
import { Button } from "@/components/ui/button.tsx";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { useUserStore } from "@/store/useUserStore";

export default function BuildingDetailsPage() {
  const navigate = useNavigate();
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-hidden flex flex-col px-4 gap-4 h-full">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Button
              className="bg-primary-gray rounded-4xl"
              onClick={() => navigate("/admin/buildings")}
            >
              <img src={GoBack} alt="goback" />
            </Button>

            <div className="text-white text-Afacad text-xl">Lista budowli</div>
          </div>

          <div className="flex gap-4 ">
            <div className="w-1/4">
              <img
                className="w-full rounded-4xl"
                src={user.pictureUrl}
                alt="Avatar"
              />
            </div>
            <Item>
              <div className="flex flex-col gap-2 ">
                <ItemContent>
                  <ItemTitle className="text-2xl text-white font-Afacad font-bold">
                    {user.name}
                  </ItemTitle>
                </ItemContent>

                <ItemDescription className="text-lg text-white font-Afacad font-bold">
                  Strażnicza
                </ItemDescription>

                <ItemDescription className="text-sm text-white font-Afacad">
                  Najprostszy typ budowli, zwiększa obszar twojej drużyny
                </ItemDescription>

                <div>
                  <img src={GreenTeam} alt="Green Team" />
                </div>
              </div>
            </Item>
          </div>

          <div className="flex flex-col gap-4">
            <Item>
              <ItemContent className="justify-between w-full flex flex-row">
                <ItemDescription className="text-lg text-white font-Afacad">
                  Pozostały czas:
                </ItemDescription>

                <div className="flex flex-row gap-2">
                  <img src={ClockIcon} className="size-8" />
                  <div className="text-lg text-white font-Afacad">15h</div>
                </div>
              </ItemContent>

              <ItemContent className="w-full flex flex-col gap-4">
                <ItemDescription className="text-lg text-white font-Afacad">
                  Wytrzymałość:
                </ItemDescription>

                <img src={Bar} alt="bar" className="w-full" />
              </ItemContent>
            </Item>
          </div>

          <img src={Line} alt="line" className="w-full" />

          <div className="flex flex-col flex-1 min-h-0">
            <div className="font-Afacad text-white text-lg shrink-0">
              Historia:
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
              <BuildingsHistoryList />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
