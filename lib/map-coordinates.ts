export type LngLatTuple = [longitude: number, latitude: number];

export function isValidLngLat(coordinates: LngLatTuple) {
  const [longitude, latitude] = coordinates;
  return Number.isFinite(longitude)
    && Number.isFinite(latitude)
    && longitude >= -180
    && longitude <= 180
    && latitude >= -90
    && latitude <= 90;
}
