import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GnomeFormData } from "@/schemas/gnomeSchema";
import { gnomeSchema } from "@/schemas/gnomeSchema";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

type OutletContextType = {
  selectedPosition: { lat: number; lng: number } | null;
};

function GnomeAdd() {
  const { selectedPosition } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const { addGnome } = useGnomeStore();
  const { districts } = useDistrictStore();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GnomeFormData>({
    resolver: zodResolver(gnomeSchema),
  });

  const pictureFile = watch("pictureURL");
  useEffect(() => {
    if (pictureFile && pictureFile.length > 0) {
      const file = pictureFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [pictureFile]);

  useEffect(() => {
    if (selectedPosition) {
      setValue("latitude", selectedPosition.lat);
      setValue("longitude", selectedPosition.lng);
    }
  }, [selectedPosition, setValue]);

  const onSubmit = async (data: GnomeFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("funFact", data.funFact ?? "");
    formData.append("latitude", String(data.latitude ?? 0));
    formData.append("longitude", String(data.longitude ?? 0));
    formData.append("districtId", String(Number(data.districtId)));
    if (data.pictureURL && data.pictureURL.length > 0) {
      formData.append("file", data.pictureURL[0]);
    }
    const created = await addGnome(formData);
    toast.success(`Dodano nowego krasnala "${created.name}"`);
    navigate("/gnomes");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-white p-4 font-Afacad flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-4">Dodaj nowego krasnala</h2>
      <div className="flex flex-row items-stretch gap-4">
        <label className="relative w-32 h-40 rounded overflow-hidden bg-gray-700 cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="Podgląd zdjęcia"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-gray-300">
              Brak zdjęcia
            </span>
          )}
          <Input
            type="file"
            accept="image/*"
            {...register("pictureURL")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
        {errors.pictureURL?.message && (
          <span className="text-red-400">
            {String(errors.pictureURL.message)}
          </span>
        )}
        <div className="flex flex-col justify-between h-40 flex-1">
          <Input
            type="text"
            placeholder="Nazwa"
            {...register("name")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.name?.message && (
            <span className="text-red-400">{String(errors.name.message)}</span>
          )}
          <select
            {...register("districtId", { valueAsNumber: true })}
            className="p-2 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option value="">-- Wybierz dzielnicę --</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.districtId?.message && (
            <span className="text-red-400">
              {String(errors.districtId.message)}
            </span>
          )}
          <Input
            type="text"
            placeholder="Lokalizacja (nazwa miejsca)"
            {...register("location")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.location?.message && (
            <span className="text-red-400">
              {String(errors.location.message)}
            </span>
          )}
        </div>
      </div>
      <Input type="hidden" {...register("latitude", { valueAsNumber: true })} />
      <Input
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
        {errors.description?.message && (
          <span className="text-red-400">
            {String(errors.description.message)}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2">
        Ciekawostka:
        <Input
          type="text"
          {...register("funFact")}
          className="p-2 rounded bg-gray-800 text-white"
        />
        {errors.funFact?.message && (
          <span className="text-red-400">{String(errors.funFact.message)}</span>
        )}
      </label>
      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary-color text-white rounded-2xl"
        >
          Dodaj krasnala
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

export default GnomeAdd;
