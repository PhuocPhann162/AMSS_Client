export const CARE_LOG_TYPE = {
  Sowing: 0,
  Watering: 1,
  Fertilizing: 2,
  SprayingPesticides: 3,
  Pruning: 4,
  Harvesting: 5,
  Other: 6,
} as const;

export type CareLogType = (typeof CARE_LOG_TYPE)[keyof typeof CARE_LOG_TYPE];

export const CARE_LOG_TYPE_LABEL = {
  [CARE_LOG_TYPE.Sowing]: 'Sowing',
  [CARE_LOG_TYPE.Watering]: 'Watering',
  [CARE_LOG_TYPE.Fertilizing]: 'Fertilizing',
  [CARE_LOG_TYPE.SprayingPesticides]: 'Spraying Pesticides',
  [CARE_LOG_TYPE.Pruning]: 'Pruning',
  [CARE_LOG_TYPE.Harvesting]: 'Harvesting',
  [CARE_LOG_TYPE.Other]: 'Other',
};
