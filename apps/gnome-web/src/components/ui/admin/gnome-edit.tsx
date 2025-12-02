import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";
import placeholderImage from "@/assets/images/placeholder.png";
import { Button } from "@/components/ui/button";
import type { GnomeFormData } from "@/schemas/gnomeSchema";
import { gnomeSchema } from "@/schemas/gnomeSchema";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  selectedPosition: { lat: number; lng: number } | null;
};

function GnomeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes, updateGnome } = useGnomeStore();
  const { districts } = useDistrictStore();
  const { selectedPosition } = useOutletContext<OutletContextType>();

  const gnome = gnomes.find((g) => g.id.toString() === id);

  const [preview, setPreview] = useState<string | null>(
    gnome?.pictureUrl || null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GnomeFormData>({
    resolver: zodResolver(gnomeSchema),
    defaultValues: {
      name: gnome?.name || "",
      description: gnome?.description || "",
      location: gnome?.location || "",
      funFact: gnome?.funFact || "",
      latitude: gnome?.latitude || 0,
      longitude: gnome?.longitude || 0,
      districtId: gnome?.districtId || "",
      pictureURL: [] as any,
    },
  });

  const pictureFile = watch("pictureURL");
  useEffect(() => {
    if (pictureFile && pictureFile.length > 0) {
      const file = pictureFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(gnome?.pictureUrl || null);
    }
  }, [pictureFile, gnome]);

  useEffect(() => {
    if (!gnome) {
      toast.error(`Nie znaleziono krasnala o ID ${id}`);
      navigate("/admin");
    }
  }, [gnome, id, navigate]);

  useEffect(() => {
    if (selectedPosition) {
      setValue("latitude", selectedPosition.lat);
      setValue("longitude", selectedPosition.lng);
    }
  }, [selectedPosition, setValue]);

  const onSubmit = async (data: GnomeFormData) => {
    if (!gnome) return;

    const file = data.pictureURL?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("pictureUrl", file);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("funFact", data.funFact || "");
    formData.append("districtId", data.districtId);
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));
    formData.append("id", gnome.id.toString());
    formData.append("creationDate", gnome.creationDate);
    formData.append("exists", "true");

    await updateGnome(gnome.id, formData);
    toast.success(`Zapisano zmiany dla gnoma "${data.name}"`);
    navigate("/admin");
  };

  if (!gnome) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-white p-6 flex flex-col gap-4 font-Afacad max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Edytuj krasnala</h2>

      <div className="flex flex-row items-stretch gap-4">
        <div className="relative w-32 h-40 rounded overflow-hidden bg-gray-700">
          {preview ? (
            <img
              src={preview}
              alt="Podgląd zdjęcia"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImage;
              }}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-gray-300">
              Brak zdjęcia
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("pictureURL")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {errors.pictureURL && (
          <span className="text-red-400">{errors.pictureURL.message}</span>
        )}

        <div className="flex flex-col justify-between h-40 flex-1">
          <input
            type="text"
            placeholder="Nazwa"
            {...register("name")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}

          <select
            {...register("districtId")}
            className="p-2 rounded bg-gray-800 text-white"
          >
            <option value="">-- Wybierz dzielnicę --</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.districtId && (
            <span className="text-red-400">{errors.districtId.message}</span>
          )}

          <input
            type="text"
            placeholder="Lokalizacja (nazwa miejsca)"
            {...register("location")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.location && (
            <span className="text-red-400">{errors.location.message}</span>
          )}
        </div>
      </div>

      <input type="hidden" {...register("latitude", { valueAsNumber: true })} />
      <input
        type="hidden"
        {...register("longitude", { valueAsNumber: true })}
      />

      {selectedPosition ? (
        <div className="bg-gray-800 p-2 rounded text-sm text-gray-300">
          <p>📍 Wybrany punkt na mapie:</p>
          <p>Latitude: {selectedPosition.lat}</p>
          <p>Longitude: {selectedPosition.lng}</p>
        </div>
      ) : (
        <div className="bg-gray-800 p-2 rounded text-sm text-gray-400">
          Kliknij na mapie, aby wybrać punkt
        </div>
      )}

      <label className="flex flex-col gap-2">
        Opis:
        <textarea
          {...register("description")}
          className="p-2 rounded bg-gray-800 text-white"
        />
        {errors.description && (
          <span className="text-red-400">{errors.description.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        Ciekawostka:
        <input
          type="text"
          {...register("funFact")}
          className="p-2 rounded bg-gray-800 text-white"
        />
        {errors.funFact && (
          <span className="text-red-400">{errors.funFact.message}</span>
        )}
      </label>

      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary-color text-white rounded-2xl"
        >
          Zapisz zmiany
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex-1 bg-gray-600 text-white rounded-2xl hover:bg-white/10"
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}

export default GnomeEdit;
