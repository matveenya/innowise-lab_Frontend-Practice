import type { SkillCategory, Skill } from 'cv-graphql';

export type GetSkillsResult = {
  skills: Skill[];
};

export type SkillLevel = 'novice' | 'advanced' | 'competent' | 'proficient' | 'expert';

export type { SkillCategory, Skill };
