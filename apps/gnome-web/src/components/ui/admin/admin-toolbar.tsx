import { Link } from "react-router-dom";
import AppIcon from "@/assets/images/app-icon.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function AdminToolbar() {
  return (
    <div className="flex justify-between items-center rounded-4xl bg-primary-gray text-white px-4 py-2">
      {/* Lewa część */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/admin">
                <div className="flex flex-row gap-2 items-center">
                  <img src={AppIcon} alt="app-icon" />
                  <div>Krasnal GO</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Prawa część */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary-gray">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  Jacek Wróbel
                  <div className="text-sm text-gray-300">administrator</div>
                </div>
                <img src={AppIcon} alt="" className="w-10 h-10 rounded-4xl" />
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/">Strona Główna</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/privacy">Polityka Prywatności</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/login">Wyloguj</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default AdminToolbar;
