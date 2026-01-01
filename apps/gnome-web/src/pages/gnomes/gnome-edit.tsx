import type { CreateGnomeRequest } from "@repo/shared/requests";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";
import { GnomeForm } from "@/components/admin/gnome-form";
import type { GnomeFormData } from "@/schemas/gnomeSchema";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  selectedPosition: { lat: number; lng: number } | null;
};

export default function GnomeEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes, updateGnome } = useGnomeStore();
  const { districts } = useDistrictStore();
  const { selectedPosition } = useOutletContext<OutletContextType>();

  const gnome = gnomes.find((g) => g.id.toString() === id);

  if (!gnome) {
    toast.error(`Nie znaleziono krasnala o ID ${id}`);
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (data: GnomeFormData) => {
    const updatedGnome: Partial<CreateGnomeRequest> = {
      name: data.name,
      description: data.description,
      location: data.location,
      funFact: data.funFact,
      latitude: data.latitude,
      longitude: data.longitude,
      creationDate: new Date(gnome.creationDate),
    };

    await updateGnome(gnome.id, updatedGnome);
    toast.success(`Zapisano zmiany dla gnoma "${data.name}"`);
    navigate("/admin");
  };

  return (
    <GnomeForm
      // @ts-expect-error
      defaultValues={gnome}
      districts={districts}
      selectedPosition={selectedPosition}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin")}
    />
  );
}
