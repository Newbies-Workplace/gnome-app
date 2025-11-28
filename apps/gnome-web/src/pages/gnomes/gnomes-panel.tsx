import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@/assets/icons/add-icon.svg";
import GnomesList from "@/components/ui/admin/gnomes-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GnomesPanel() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto flex flex-col h-full gap-2">
      <div className="text-center text-white text-3xl font-bold font-Afacad">
        Panel Krasnali
      </div>
      <Input
        id="search-gnome"
        type="text"
        placeholder="Wyszukaj krasnala..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-white font-Afacad rounded-4xl bg-[#282B28] border-none outline-none"
      />
      <Button
        className="text-center text-white font-Afacad bg-primary-color border-none rounded-4xl"
        onClick={() => navigate("/admin/gnomes/add")}
      >
        <img src={AddIcon} alt="add" />
        Dodaj nowego krasnala
      </Button>
      <GnomesList />
    </div>
  );
}

export default GnomesPanel;
