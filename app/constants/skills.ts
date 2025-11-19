import type { SkillLevel } from '~/graphql/types/skill';

export const SKILL_LEVEL_SETTINGS: Record<SkillLevel, number> = {
  novice: 20,
  advanced: 40,
  competent: 60,
  proficient: 80,
  expert: 100,
} as const;
