import GnomesList from "@/components/ui/admin/gnomes-list";

function GnomePanel() {
  return (
    <div className="overflow-y-auto flex flex-col h-full m-2">
      <div className="text-center text-white text-3xl font-bold font-Afacad">
        Panel Krasnali
      </div>
      <button className="text-center text-white">
        {" "}
        + Dodaj nowego krasnala
      </button>
      <GnomesList />
    </div>
  );
}

export default GnomePanel;
