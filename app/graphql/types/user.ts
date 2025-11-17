import type { User, Profile, Department, Position } from 'cv-graphql';

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

export type { User };
