export default function calculateBoundingBox(
  latitude: number,
  longitude: number,
  radiusKm: number,
): [number[], number[]] {
  const R = 6371 // Radius of Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const phi1 = latitude * (Math.PI / 180)
  const lambda1 = longitude * (Math.PI / 180)

  // Calculate the bounding box
  const deltaPhi = radiusKm / (R * Math.cos(phi1))
  const deltaLambda = radiusKm / R

  // Top corner
  const topLatitude = phi1 + deltaPhi
  const topLongitude = lambda1 + deltaLambda

  // Bottom corner
  const bottomLatitude = phi1 - deltaPhi
  const bottomLongitude = lambda1 - deltaLambda

  function toDegrees(radians: number): number {
    return radians * (180 / Math.PI)
  }

  return [
    [toDegrees(bottomLatitude), toDegrees(bottomLongitude)],
    [toDegrees(topLatitude), toDegrees(topLongitude)],
  ]
}

// Example usage:
const centerLat = 34.0522
const centerLon = -118.2437 // Coordinates for Los Angeles
const radiusKm = 100 // Radius in kilometers

const boundingBox = calculateBoundingBox(centerLat, centerLon, radiusKm)
console.log("Bounding Box:", boundingBox)
