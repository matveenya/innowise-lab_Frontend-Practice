import type { User } from 'cv-graphql';

export type GetUsersResult = {
  users: User[];
};

export type GetUserByIdResult = {
  user: User;
};

export type { User };
