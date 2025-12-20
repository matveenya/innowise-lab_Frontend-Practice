import type {
  User,
  Profile,
  Department,
  Position,
  UpdateUserInput,
  UploadAvatarInput,
  UpdateProfileInput,
  DeleteAvatarInput,
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  UpdateProfileSkillInput,
  AddProfileLanguageInput,
  UpdateProfileLanguageInput,
  DeleteProfileLanguageInput,
} from 'cv-graphql';

export type GetUsersResult = {
  users: User[];
};

export type GetUserByIdResult = {
  user: User;
};

export type GetUserProfileResult = {
  profile: Profile;
};

export type GetDepartmentsResult = {
  departments: Department[];
};

export type GetPositionsResult = {
  positions: Position[];
};

export type UpdateUserResult = {
  updateUser: User;
};

export type UpdateUserArgs = {
  user: UpdateUserInput;
};

export type UploadAvatarResult = {
  uploadAvatar: string;
};

export type UploadAvatarArgs = {
  avatar: UploadAvatarInput;
};

export type UpdateProfileResult = {
  updateProfile: Profile;
};

export type UpdateProfileArgs = {
  profile: UpdateProfileInput;
};

export type DeleteAvatarResult = {
  deleteAvatar: null;
};

export type DeleteAvatarArgs = {
  avatar: DeleteAvatarInput;
};

export type AddProfileSkillResult = {
  addProfileSkill: Profile;
};

export type AddProfileSkillArgs = {
  skill: AddProfileSkillInput;
};

export type DeleteProfileSkillResult = {
  deleteProfileSkill: Profile;
};

export type DeleteProfileSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type UpdateProfileSkillResult = {
  updateProfileSkill: Profile;
};

export type UpdateProfileSkillArgs = {
  skill: UpdateProfileSkillInput;
};

export type AddProfileLanguageResult = {
  addProfileLanguage: Profile;
};

export type AddProfileLanguageArgs = {
  language: AddProfileLanguageInput;
};

export type UpdateProfileLanguageResult = {
  updateProfileLanguage: Profile;
};

export type UpdateProfileLanguageArgs = {
  language: UpdateProfileLanguageInput;
};

export type DeleteProfileLanguageResult = {
  deleteProfileLanguage: Profile;
};

export type DeleteProfileLanguageArgs = {
  language: DeleteProfileLanguageInput;
};

export type {
  User,
  UpdateUserInput,
  Department,
  Position,
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  UpdateProfileSkillInput,
  AddProfileLanguageInput,
  UpdateProfileLanguageInput,
  DeleteProfileLanguageInput,
};
