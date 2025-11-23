import type { Proficiency } from 'cv-graphql';

export const PROFICIENCY_VALUES: Proficiency[] = [
  'A1' as Proficiency,
  'A2' as Proficiency,
  'B1' as Proficiency,
  'B2' as Proficiency,
  'C1' as Proficiency,
  'C2' as Proficiency,
  'Native' as Proficiency,
];

export const AVAILABLE_LANGUAGES = [
  'English',
  'Russian',
  'Belarussian',
  'German',
  'Polish',
  'Portugal',
  'Italian',
] as const;

export const PROFICIENCY_COLOR_MAP: Record<Proficiency, string> = {
  A1: 'novice',
  A2: 'novice',
  B1: 'advanced',
  B2: 'competent',
  C1: 'proficient',
  C2: 'proficient',
  Native: 'secondary',
};

export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number];
export type { Proficiency };
