import { z } from "zod";

export const gnomeSchema = z.object({
  name: z.string().min(2, "Nazwa musi mieć co najmniej 2 znaki"),
  description: z.string().min(10, "Opis musi mieć co najmniej 10 znaków"),
  location: z.string().min(2, "Podaj nazwę lokalizacji"),
  funFact: z
    .string()
    .max(200, "Ciekawostka nie może przekraczać 200 znaków")
    .optional(),
  pictureURL: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length > 0,
      "Dodaj zdjęcie",
    ),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type GnomeFormData = z.infer<typeof gnomeSchema>;
