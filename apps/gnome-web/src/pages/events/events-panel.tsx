import { Button } from "@/components/ui/button";

function EventsPanel() {
  return (
    <div className="overflow-y-auto flex flex-col h-full gap-2">
      <div className="text-center text-white text-3xl font-bold font-Afacad">
        Panel Wydarzeń
      </div>
      <Button className="text-center text-white font-Afacad bg-primary-color border-none rounded-4xl">
        Wydarzenie krasnala
      </Button>
      <Button className="text-center text-white font-Afacad bg-primary-color border-none rounded-4xl">
        Wydarenie dzielnicowe
      </Button>
      <Button className="text-center text-white font-Afacad bg-primary-color border-none rounded-4xl">
        Wydarzenie miejscowe
      </Button>
      <Button className="text-center text-white font-Afacad bg-primary-color border-none rounded-4xl">
        Wydarzenie datowe
      </Button>
    </div>
  );
}

export default EventsPanel;
