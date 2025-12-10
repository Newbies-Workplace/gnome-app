import { useNavigate, useOutletContext } from "react-router-dom";
import { GnomeForm } from "@/components/admin/gnome-form";
import { useToastNavigate } from "@/hooks/useToastNavigate";
import type { GnomeFormData } from "@/schemas/gnomeSchema";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  selectedPosition: { lat: number; lng: number } | null;
};

export default function GnomeAddPage() {
  const { selectedPosition } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const toastNavigate = useToastNavigate();

  const addGnome = useGnomeStore((s) => s.addGnome);
  const districts = useDistrictStore((s) => s.districts);

  const handleSubmit = async (data: GnomeFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);

    formData.append("funFact", data.funFact || "");
    formData.append("latitude", String(data.latitude || 0));
    formData.append("longitude", String(data.longitude || 0));
    formData.append("creationDate", new Date().toISOString());

    if (data.pictureURL && data.pictureURL.length > 0) {
      formData.append("file", data.pictureURL[0]);
    }

    try {
      const created = await addGnome(formData);
      toastNavigate(
        "/admin",
        `Dodano nowego krasnala "${created.name}"`,
        "success",
      );
    } catch (err) {
      toastNavigate("/admin", "Nie udało się dodać krasnala", "error");
    }
  };

  return (
    <GnomeForm
      districts={districts}
      selectedPosition={selectedPosition}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin")}
    />
  );
}
