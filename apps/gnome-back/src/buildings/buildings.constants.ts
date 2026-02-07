export const MAX_ATTACK_DAMAGE = 40;
export const BUILDINGS_MIN_DISTANCE_METERS_BETWEEN = 50;

export type BuildingConstants = {
  type: "MINE" | "WATCHTOWER";
  costs: {
    berries: number;
    sticks: number;
    stones: number;
  };
  maxHealth: number;
};

export const BUILDINGS: BuildingConstants[] = [
  {
    type: "MINE",
    costs: { berries: 15, sticks: 15, stones: 15 },
    maxHealth: 75,
  },
  {
    type: "WATCHTOWER",
    costs: { berries: 15, sticks: 15, stones: 15 },
    maxHealth: 100,
  },
];
