export interface LocalityData {
  date: string;
  locality: string;
  district: string;
  latitude: string;
  longitude: string;
  lst_celsius: string;
  air_temp_celsius: string;
  urban_heat_intensity: string;
  dominant_roof_material: string;
  green_cover_pct: string;
  population_density_per_km2: string;
  locality_type: "affluent" | "planned" | "dense_urban" | "informal" | "industrial" | "institutional";
  data_source: string;
  roof_score: number;
  norm_temp: number;
  norm_pop: number;
  norm_green: number;
  HVI: number;
}

export type LayerType = "satellite" | "street" | "hybrid";
export type LocalityType = "all" | LocalityData["locality_type"];
