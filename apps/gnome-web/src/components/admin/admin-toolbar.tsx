import { Link } from "react-router-dom";
import AppIcon from "@/assets/images/app-icon.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import { useAuthStore } from "@/store/useAuthStore.ts";

function AdminToolbar() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex justify-between items-center rounded-2xl bg-primary-gray text-white p-2 w-full h-16">
      <Link to="/admin">
        <div className="flex flex-row gap-2 items-center">
          <img src={AppIcon} alt="app-icon" className="w-10 h-10" />
          <b>Krasnal GO</b>
        </div>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary-gray">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-end">
                  <span>{user?.name}</span>
                  <span className="text-sm text-gray-300">{user?.role}</span>
                </div>
                <img
                  src={user?.pictureUrl}
                  alt=""
                  className="w-10 h-10 rounded-2xl"
                />
              </div>
            </NavigationMenuTrigger>

            <NavigationMenuContent className={"min-w-[200px]"}>
              <NavigationMenuLink asChild>
                <Link to="/">Strona Główna</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/privacy">Polityka Prywatności</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild onClick={() => logout()}>
                <Link className={"cursor-pointer"} to={""}>
                  Wyloguj
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default AdminToolbar;
