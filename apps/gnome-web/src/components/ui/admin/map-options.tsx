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
  setFilters: (filters: {
    gnomesVisible: boolean;
    buildingsVisible: boolean;
  }) => void;
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
          onCheckedChange={(checked) =>
            setFilters({ ...filters, gnomesVisible: checked === true })
          }
        >
          Pokaż gnomy
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.buildingsVisible}
          onCheckedChange={(checked) =>
            setFilters({ ...filters, buildingsVisible: checked === true })
          }
        >
          Pokaż budowle
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
