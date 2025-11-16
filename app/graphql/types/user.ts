import type { User, Profile } from 'cv-graphql';

export type GetUsersResult = {
  users: User[];
};

export type GetUserByIdResult = {
  user: User;
};

export type GetUserProfileResult = {
  profile: Profile;
};

export type { User };
