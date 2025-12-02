import { GnomeResponse } from "@repo/shared/responses";

export function getClosestGnome(
  distances: {
    gnome: GnomeResponse;
    distance: number;
  }[],
  latestInteractions: {
    gnomeId: string;
    interactionDate: Date;
  }[],
) {
  const updatedDistances = distances.filter((distance) => {
    const gnomeInteraction = latestInteractions.find(
      (interaction) => interaction.gnomeId === distance.gnome.id,
    );

    if (!gnomeInteraction) return distance;

    const interactionTime = new Date(
      gnomeInteraction.interactionDate,
    ).getTime();
    const ageMs = Date.now() - interactionTime;
    const FIVE_MIN_MS = 5 * 60 * 1000;

    console.log(ageMs);

    return ageMs > FIVE_MIN_MS;
  });

  const closestGnome = updatedDistances.reduce<{
    gnome: GnomeResponse;
    distance: number;
  } | null>((closest, current) => {
    if (!closest || current.distance < closest.distance) {
      return current;
    }
    return closest;
  }, null);

  return closestGnome;
}
