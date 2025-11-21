import { z } from 'zod';
import { MASTERY_VALUES } from '~/constants/skills';

export const addSkillSchema = z.object({
  skill: z.object({
    id: z.string(),
    category_name: z.string(),
  }),
  mastery: z.enum(MASTERY_VALUES),
});

export type AddSkillSchemaType = z.infer<typeof addSkillSchema>;
