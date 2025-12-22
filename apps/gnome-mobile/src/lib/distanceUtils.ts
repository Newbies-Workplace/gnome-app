export const formatDistance = (distanceInMeters: number): string => {
  return distanceInMeters < 1000
    ? `${distanceInMeters} m`
    : `${(distanceInMeters / 1000).toFixed(2)} km`;
};
