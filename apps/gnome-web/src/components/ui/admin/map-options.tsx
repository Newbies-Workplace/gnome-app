import MapOptionIcon from "@/assets/icons/map-option-icon.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <Button className="rounded-4xl">
          <div className="flex flex-row gap-4 items-center">
            <img src={MapOptionIcon} alt="map" className="w-6 h-6" /> Opcje
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
