import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import placeholderImage from "@/assets/images/placeholder.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GnomeFormData } from "@/schemas/gnomeSchema";
import { gnomeSchema } from "@/schemas/gnomeSchema";

type GnomeFormProps = {
  districts: { id: number; name: string }[];
  selectedPosition?: { lat: number; lng: number } | null;
  onSubmit: (data: GnomeFormData, preview: string | null) => void;
  onCancel: () => void;
};

export function GnomeForm({
  districts,
  selectedPosition,
  onSubmit,
  onCancel,
}: GnomeFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GnomeFormData>({
    resolver: zodResolver(gnomeSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      funFact: "",
      latitude: 0,
      longitude: 0,
      districtId: 0,
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
    }
  }, [pictureFile]);

  useEffect(() => {
    if (selectedPosition) {
      setValue("latitude", selectedPosition.lat);
      setValue("longitude", selectedPosition.lng);
    }
  }, [selectedPosition, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, preview))}
      className="text-white p-6 flex flex-col gap-4 font-Afacad max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Dodaj krasnala</h2>

      <div className="flex flex-row items-stretch gap-4">
        <label className="relative w-32 h-40 rounded overflow-hidden bg-gray-700 cursor-pointer">
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
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              Nowe zdjęcie
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            {...register("pictureURL")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>

        {errors.pictureURL?.message && (
          <div className="text-red-400">
            {String(errors.pictureURL.message)}
          </div>
        )}

        <div className="flex flex-col justify-between h-40 flex-1">
          <Input
            type="text"
            placeholder="Nazwa"
            {...register("name")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.name && (
            <div className="text-red-400">{errors.name.message}</div>
          )}

          <select
            {...register("districtId", { valueAsNumber: true })}
            className="p-2 rounded bg-gray-800 text-white w-full"
          >
            <option value="">-- Wybierz dzielnicę --</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {errors.districtId && (
            <div className="text-red-400">{errors.districtId.message}</div>
          )}

          <Input
            type="text"
            placeholder="Lokalizacja (nazwa miejsca)"
            {...register("location")}
            className="p-2 rounded bg-gray-800 text-white"
          />
          {errors.location && (
            <div className="text-red-400">{errors.location.message}</div>
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
        {errors.description && (
          <div className="text-red-400">{errors.description.message}</div>
        )}
      </label>

      <label className="flex flex-col gap-2">
        Ciekawostka:
        <Input
          type="text"
          {...register("funFact")}
          className="p-2 rounded bg-gray-800 text-white"
        />
        {errors.funFact && (
          <div className="text-red-400">{errors.funFact.message}</div>
        )}
      </label>

      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary-color text-white rounded-2xl"
        >
          Dodaj
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white rounded-2xl hover:bg-white/10"
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}
