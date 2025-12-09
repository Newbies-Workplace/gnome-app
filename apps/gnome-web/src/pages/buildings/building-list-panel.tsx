import BuildsList from "@/components/admin/builds-list";
import { Input } from "@/components/ui/input";

function BuildingListPanel() {
  return (
    <div className="overflow-y-auto flex flex-col h-full gap-2">
      <div className="text-center text-white text-3xl font-bold font-Afacad">
        Panel Budowli
      </div>
      <Input
        id="search-user"
        type="text"
        placeholder="Wyszukaj budowlę..."
        className="text-white font-Afacad rounded-2xl bg-[#282B28] border-none outline-none"
      />
      <BuildsList />
    </div>
  );
}

export default BuildingListPanel;
