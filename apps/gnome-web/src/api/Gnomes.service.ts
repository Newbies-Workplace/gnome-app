import type { CreateGnomeRequest } from "@repo/shared/requests";
import type { GnomeResponse } from "@repo/shared/responses";

const BASE_URL = "/gnomes";

export class GnomesService {
  static async getGnomes(): Promise<GnomeResponse[]> {
    const res = await fetch(BASE_URL, { method: "GET" });
    if (!res.ok) throw new Error("Failed to load gnomes");
    return res.json();
  }

  static async addGnome(payload: FormData): Promise<GnomeResponse> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: payload,
    });
    if (!res.ok) throw new Error("Failed to add gnome");
    return res.json();
  }

  static async updateGnome(
    id: string,
    payload: Partial<CreateGnomeRequest>,
  ): Promise<GnomeResponse> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update gnome");
    return res.json();
  }

  static async removeGnome(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to remove gnome");
  }
}
