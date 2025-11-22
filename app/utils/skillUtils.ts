import type { Skill } from '~/graphql/types';

export type SkillGroup = {
  label: string;
  items: Skill[];
};

export const groupSkillsByCategory = (skills: Skill[]): SkillGroup[] => {
  const groups: Record<string, SkillGroup> = {};

  skills.forEach(skill => {
    const groupName = skill.category_name || 'Other';

    if (!groups[groupName]) {
      groups[groupName] = {
        label: groupName,
        items: [],
      };
    }

    groups[groupName].items.push(skill);
  });

  return Object.values(groups);
};
