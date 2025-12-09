import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import BlockIcon from "@/assets/icons/block-icon.svg";
import DeleteIcon from "@/assets/icons/delete-icon.svg";
import GoBack from "@/assets/icons/goBack-icon.svg";
import GreenTeam from "@/assets/icons/green-team.svg";
import PlusIcon from "@/assets/icons/plus-icon.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import GnomeAvatar from "@/assets/images/placeholder-user.png";
import BuildingsList from "@/components/admin/buildings-list";
import { Button } from "@/components/ui/button.tsx";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item.tsx";
import { useUserStore } from "@/store/useUserStore";

export default function UserDetailPanel() {
  const navigate = useNavigate();

  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-hidden flex flex-col px-4 gap-4 h-full">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-row gap-4 items-center">
            <Button
              className="bg-primary-gray rounded-4xl"
              onClick={() => navigate("/admin/users")}
            >
              <img src={GoBack} alt="goback" />
            </Button>

            <div className="text-white text-Afacad text-xl">
              Lista użytkowników
            </div>
          </div>

          {/* Górna część */}
          <div className="flex gap-4">
            <div className="w-1/4">
              <img
                className="w-full rounded-4xl"
                src={user.pictureUrl}
                alt="Avatar"
              />
            </div>

            <Item>
              <div className="flex flex-col gap-2">
                <ItemContent>
                  <ItemTitle className="text-2xl text-white font-Afacad font-bold">
                    {user.name}
                  </ItemTitle>
                </ItemContent>
                <div>
                  <img src={GreenTeam} alt="Green Team" />
                </div>
              </div>
            </Item>
          </div>

          {/* Statystyki do pobrania z bazy */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-row rounded-4xl border border-black text-2xl text-white font-Afacad px-4 py-2 w-full items-center">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-2">
                  <img src={BerryIcon} className="w-8 h-8" />
                  <div>12</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <img src={StoneIcon} className="w-8 h-8" />
                  <div>10</div>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <img src={WoodIcon} className="w-8 h-8" />
                  <div>5</div>
                </div>
              </div>
            </div>

            <div>
              <Button className="h-full w-full flex items-center justify-center text-4xl leading-none border border-black rounded-4xl bg-primary-gray">
                <img src={PlusIcon} alt="Plus" />
              </Button>
            </div>
          </div>

          {/* Przyciski */}
          <div className="flex flex-col gap-2 w-full">
            <Button className="bg-primary-color rounded-4xl">
              <img src={BlockIcon} />
              Zbanuj użytkownika
            </Button>

            <Button className="bg-primary-color rounded-4xl">
              <img src={DeleteIcon} />
              Usuń budowle użytkownika
            </Button>
          </div>

          <div className="text-white text-Afacad text-xl">Budowle:</div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Tymczasowo wywołana do testow, do zrobienia lista budowli danego użytkownika */}
            <BuildingsList />
          </div>
        </div>
      ))}
    </div>
  );
}
