export function convertHealthToRemainingTime(health: number): number {
  if (health <= 0) return 0;
  return health; // 1 HP = 1 godzina
}
