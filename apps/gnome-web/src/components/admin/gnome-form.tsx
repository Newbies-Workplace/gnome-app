import { zodResolver } from "@hookform/resolvers/zod";
import type { GnomeResponse } from "@repo/shared/responses";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MarkerIcon from "@/assets/icons/mark-icon.svg";
import placeholderImage from "@/assets/images/gnomeplaceholder.svg";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { GnomeFormData } from "@/schemas/gnomeSchema.ts";
import { gnomeSchema } from "@/schemas/gnomeSchema.ts";

type GnomeFormProps = {
  gnome?: GnomeResponse;
  selectedPosition?: { lat: number; lng: number } | null;
  onSubmit: (data: GnomeFormData) => void;
  onCancel: () => void;
};

export function GnomeForm({
  gnome,
  selectedPosition,
  onSubmit,
  onCancel,
}: GnomeFormProps) {
  const [preview, setPreview] = useState<string | null>(
    gnome?.pictureUrl ?? null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GnomeFormData>({
    resolver: zodResolver(gnomeSchema),
    defaultValues: gnome ?? {
      name: "",
      description: "",
      location: "",
      funFact: "",
      latitude: 0,
      longitude: 0,
      pictureURL: undefined,
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
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="text-white p-4 flex flex-col w-full gap-4 font-Afacad max-w-2xl mx-auto"
    >
      <div className="flex flex-row gap-4">
        <label className="relative w-32 h-40 rounded overflow-hidden bg-[#282B28] cursor-pointer">
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
          {preview && (
            <Button
              variant="default"
              size="icon"
              className="absolute top-0.5 right-0.5 cursor-pointer rounded-full bg-black/50"
              onClick={(e) => {
                e.preventDefault();
                setPreview(null);
                setValue("pictureURL", null);
              }}
            >
              X
            </Button>
          )}
        </label>

        <div className="flex flex-col justify-between h-40 flex-1">
          <Input
            type="text"
            placeholder="Nazwa"
            {...register("name")}
            className="p-2 rounded bg-[#282B28] text-white"
          />
          {errors.name && (
            <div className="text-red-400 text-xs">{errors.name.message}</div>
          )}
          <Input
            type="text"
            placeholder="Lokalizacja (nazwa miejsca)"
            {...register("location")}
            className="p-2 rounded bg-[#282B28] text-white"
          />
          {errors.location && (
            <div className="text-red-400 text-xs">
              {errors.location.message}
            </div>
          )}

          <Input
            type="hidden"
            {...register("latitude", { valueAsNumber: true })}
          />
          <Input
            type="hidden"
            {...register("longitude", { valueAsNumber: true })}
          />

          {selectedPosition ? (
            <div className="bg-[#282B28] p-2 rounded text-sm text-gray-300">
              <div className="flex flex-row items-center">
                <img src={MarkerIcon} alt="icon" className="w-5 h-5" />
                <div className="text-xs">Wybrany punkt na mapie:</div>
              </div>
              <div className="text-xs">Latitude: {selectedPosition.lat}</div>
              <div className="text-xs">Longitude: {selectedPosition.lng}</div>
            </div>
          ) : (
            <div className="bg-[#282B28] p-2 rounded text-sm text-gray-400">
              Kliknij na mapie, aby wybrać punkt
            </div>
          )}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        Opis:
        <textarea
          {...register("description")}
          className="p-2 rounded bg-[#282B28] text-white h-40"
        />
        {errors.description && (
          <div className="text-red-400">{errors.description.message}</div>
        )}
      </label>

      <label className="flex flex-col gap-2">
        Ciekawostka:
        <textarea
          {...register("funFact")}
          className="p-2 rounded bg-[#282B28] text-white h-20"
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
          {gnome ? "Zapisz" : "Dodaj"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-[#282B28] text-white rounded-2xl hover:bg-white/10"
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
}
