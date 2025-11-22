import type { FetchPolicy } from '@apollo/client';
import { apolloQuery, apolloMutation } from '~/utils/apollo';
import {
  GET_USER_BY_ID,
  GET_USER_PROFILE,
  GET_USERS,
  GET_DEPARTMENTS,
  GET_POSITIONS,
} from '~/graphql/queries';
import {
  UPDATE_USER_MUTATION,
  UPLOAD_AVATAR_MUTATION,
  UPDATE_PROFILE_MUTATION,
  DELETE_AVATAR_MUTATION,
  ADD_PROFILE_SKILL_MUTATION,
  DELETE_PROFILE_SKILL_MUTATION,
  UPDATE_PROFILE_SKILL_MUTATION,
} from '~/graphql/mutations';
import type {
  GetUserByIdResult,
  GetUserProfileResult,
  GetUsersResult,
  GetDepartmentsResult,
  GetPositionsResult,
  UpdateUserResult,
  UpdateUserArgs,
  UploadAvatarResult,
  UploadAvatarArgs,
  UpdateProfileResult,
  UpdateProfileArgs,
  DeleteAvatarResult,
  DeleteAvatarArgs,
  AddProfileSkillResult,
  AddProfileSkillArgs,
  DeleteProfileSkillResult,
  DeleteProfileSkillArgs,
  UpdateProfileSkillResult,
  UpdateProfileSkillArgs,
} from '~/graphql/types';

export async function getUsers() {
  const result = await apolloQuery<GetUsersResult>(GET_USERS, {});

  return result.users;
}

export async function getUserById(args?: { id: string }, fetchPolicy?: FetchPolicy) {
  if (!args?.id) throw new Error('User ID is required');

  const result = await apolloQuery<GetUserByIdResult, { id: string }>(
    GET_USER_BY_ID,
    { id: args.id },
    fetchPolicy
  );

  return result.user;
}

export async function getUserProfile(args?: { id: string }, fetchPolicy?: FetchPolicy) {
  if (!args?.id) throw new Error('User ID is required');

  const result = await apolloQuery<GetUserProfileResult, { id: string }>(
    GET_USER_PROFILE,
    { id: args.id },
    fetchPolicy
  );

  return result.profile;
}

export async function getDepartments(fetchPolicy?: FetchPolicy) {
  const result = await apolloQuery<GetDepartmentsResult>(GET_DEPARTMENTS, {}, fetchPolicy);

  return result.departments;
}

export async function getPositions(fetchPolicy?: FetchPolicy) {
  const result = await apolloQuery<GetPositionsResult>(GET_POSITIONS, {}, fetchPolicy);

  return result.positions;
}

export async function updateUser(args: UpdateUserArgs) {
  const result = await apolloMutation<UpdateUserResult, UpdateUserArgs>(UPDATE_USER_MUTATION, args);

  return result.updateUser;
}

export async function uploadAvatar(args: UploadAvatarArgs) {
  const result = await apolloMutation<UploadAvatarResult, UploadAvatarArgs>(
    UPLOAD_AVATAR_MUTATION,
    args
  );

  return result.uploadAvatar;
}

export async function deleteAvatar(args: DeleteAvatarArgs) {
  const result = await apolloMutation<DeleteAvatarResult, DeleteAvatarArgs>(
    DELETE_AVATAR_MUTATION,
    args
  );

  return result.deleteAvatar;
}

export async function updateProfile(args: UpdateProfileArgs) {
  const result = await apolloMutation<UpdateProfileResult, UpdateProfileArgs>(
    UPDATE_PROFILE_MUTATION,
    args
  );

  return result.updateProfile;
}

export async function addProfileSkill(args: AddProfileSkillArgs) {
  const result = await apolloMutation<AddProfileSkillResult, AddProfileSkillArgs>(
    ADD_PROFILE_SKILL_MUTATION,
    args
  );

  return result.addProfileSkill;
}

export async function updateProfileSkill(args: UpdateProfileSkillArgs) {
  const result = await apolloMutation<UpdateProfileSkillResult, UpdateProfileSkillArgs>(
    UPDATE_PROFILE_SKILL_MUTATION,
    args
  );

  return result.updateProfileSkill;
}

export async function deleteProfileSkill(args: DeleteProfileSkillArgs) {
  const result = await apolloMutation<DeleteProfileSkillResult, DeleteProfileSkillArgs>(
    DELETE_PROFILE_SKILL_MUTATION,
    args
  );

  return result.deleteProfileSkill;
}
