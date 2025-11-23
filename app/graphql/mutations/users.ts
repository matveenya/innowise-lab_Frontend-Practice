import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
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
  AddProfileLanguageResult,
  AddProfileLanguageArgs,
  UpdateProfileLanguageResult,
  UpdateProfileLanguageArgs,
  DeleteProfileLanguageResult,
  DeleteProfileLanguageArgs,
} from '../types/user';

export const UPDATE_USER_MUTATION: TypedDocumentNode<UpdateUserResult, UpdateUserArgs> = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      created_at
      email
      is_verified
      profile {
        id
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
      department_name
      position_name
      role
    }
  }
`;

export const UPLOAD_AVATAR_MUTATION: TypedDocumentNode<UploadAvatarResult, UploadAvatarArgs> = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const UPDATE_PROFILE_MUTATION: TypedDocumentNode<UpdateProfileResult, UpdateProfileArgs> =
  gql`
    mutation UpdateProfile($profile: UpdateProfileInput!) {
      updateProfile(profile: $profile) {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
    }
  `;

export const DELETE_AVATAR_MUTATION: TypedDocumentNode<DeleteAvatarResult, DeleteAvatarArgs> = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export const ADD_PROFILE_SKILL_MUTATION: TypedDocumentNode<
  AddProfileSkillResult,
  AddProfileSkillArgs
> = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_PROFILE_SKILL_MUTATION: TypedDocumentNode<
  UpdateProfileSkillResult,
  UpdateProfileSkillArgs
> = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELETE_PROFILE_SKILL_MUTATION: TypedDocumentNode<
  DeleteProfileSkillResult,
  DeleteProfileSkillArgs
> = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const ADD_PROFILE_LANGUAGE_MUTATION: TypedDocumentNode<
  AddProfileLanguageResult,
  AddProfileLanguageArgs
> = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const UPDATE_PROFILE_LANGUAGE_MUTATION: TypedDocumentNode<
  UpdateProfileLanguageResult,
  UpdateProfileLanguageArgs
> = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const DELETE_PROFILE_LANGUAGE_MUTATION: TypedDocumentNode<
  DeleteProfileLanguageResult,
  DeleteProfileLanguageArgs
> = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;
