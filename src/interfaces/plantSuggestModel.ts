interface plantSuggestModel {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string;
  origin: string | null;
  type: string;
  dimensions: {
    type: string | null;
    min_value: number;
    max_value: number;
    unit: string;
  };
  cycle: string;
  watering: string;
  depth_water_requirement: {
    unit: string;
    value: string;
  };
  volume_water_requirement: {
    unit: string;
    value: string;
  };
  watering_period: string;
  watering_general_benchmark: {
    value: string;
    unit: string;
  };
  plant_anatomy: {
    bark: string;
    leaves: string;
  };
  sunlight: string[];
  pruning_month: string[];
  pruning_count: {
    amount: number;
    interval: string;
  };
  seeds: number;
  attracts: string[];
  propagation: string[];
  hardiness: {
    min: string;
    max: string;
  };
  hardiness_location: {
    full_url: string;
    full_iframe: string;
  };
  flowers: boolean;
  flowering_season: string;
  color: string;
  soil: string[];
  pest_susceptibility: string | null;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  fruit_color: string | null;
  fruiting_season: string | null;
  harvest_season: string | null;
  harvest_method: string;
  leaf: boolean;
  leaf_color: string[];
  edible_leaf: boolean;
  growth_rate: string;
  maintenance: string;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  rare: boolean;
  rare_level: string;
  tropical: boolean;
  cuisine: boolean;
  indoor: boolean;
  care_level: string;
  description: string;
  default_image: {
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
}

export default plantSuggestModel;
