import React from "react";
import MapOptionIcon from "@/assets/icons/map-option-icon.svg";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

type MapOptionsProps = {
  filters: {
    gnomesVisible: boolean;
    buildingsVisible: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      gnomesVisible: boolean;
      buildingsVisible: boolean;
    }>
  >;
};

export default function MapOptions({ filters, setFilters }: MapOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-2xl">
          <div className="flex flex-row gap-2 items-center">
            Opcje
            <img src={MapOptionIcon} alt="map" className="w-6 h-6" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Widoczność na mapie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filters.gnomesVisible}
          onCheckedChange={() =>
            setFilters((prev) => ({
              ...prev,
              gnomesVisible: !prev.gnomesVisible,
            }))
          }
        >
          Pokaż gnomy
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.buildingsVisible}
          onCheckedChange={() =>
            setFilters((prev) => ({
              ...prev,
              buildingsVisible: !prev.buildingsVisible,
            }))
          }
        >
          Pokaż budowle
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
