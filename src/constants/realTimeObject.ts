export interface Vessel {
  id: number;
  name: string;
  coordinates: number[];
  path: VesselFeature[];
}
export interface VesselFeatureProperties {
  name: string;
}

export interface VesselFeature
  extends GeoJSON.Feature<GeoJSON.Point, VesselFeatureProperties> {}

export const vessels: Vessel[] = [
  {
    id: 1,
    name: 'Vessel 1',
    coordinates: [-74.0060152, 40.7127281],
    path: [],
  },
  { id: 2, name: 'Vessel 2', coordinates: [-74.1, 40.8], path: [] },
  { id: 3, name: 'Vessel 3', coordinates: [-73.9, 40.6], path: [] },
  { id: 4, name: 'Vessel 4', coordinates: [-73.5, 40.4], path: [] },
];
