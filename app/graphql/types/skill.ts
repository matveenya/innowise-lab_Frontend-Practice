import type {
  SkillCategory,
  Skill,
  CreateSkillInput,
  UpdateSkillInput,
  DeleteResult,
  DeleteSkillInput,
} from 'cv-graphql';

export type GetSkillsResult = {
  skills: Skill[];
};

export type SkillLevel = 'novice' | 'advanced' | 'competent' | 'proficient' | 'expert';

export type CreateSkillResult = {
  skill: Skill;
};

export type CreateSkillVariables = {
  input: CreateSkillInput;
};

export type UpdateSkillResult = {
  skill: Skill;
};

export type UpdateSkillVariables = {
  input: UpdateSkillInput;
};

export type DeleteSkillResult = {
  deleteResult: DeleteResult;
};

export type DeleteSkillVariables = {
  input: DeleteSkillInput;
};

export type { SkillCategory, Skill, CreateSkillInput, UpdateSkillInput, DeleteSkillInput };
