import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export const calculatePolygonArea = (polygonCoordinates: number[][]): number => {
  let area = 0;
  const numPoints = polygonCoordinates.length;

  if (numPoints > 2) {
    for (let i = 0; i < numPoints - 1; i++) {
      const p1 = L.latLng(polygonCoordinates[i][1], polygonCoordinates[i][0]);
      const p2 = L.latLng(polygonCoordinates[i + 1][1], polygonCoordinates[i + 1][0]);
      area += (p2.lng - p1.lng) * (p2.lat + p1.lat);
    }
    area +=
      (polygonCoordinates[numPoints - 1][0] - polygonCoordinates[0][0]) *
      (polygonCoordinates[numPoints - 1][1] + polygonCoordinates[0][1]);
    area /= 2;
    area = Math.abs(area);
  }

  return area;
};

export const convertSquareMetersToAcres = (squareMeters: number): number => {
  const squareMetersInOneAcre = 4046.86;
  return squareMeters / squareMetersInOneAcre;
};

export async function getAddress(coords: any) {
  const provider = new OpenStreetMapProvider();
  const results = await provider.search({ query: coords });
  console.log(results);
  if (results.length > 0) {
    return results[0].label;
  }
}
