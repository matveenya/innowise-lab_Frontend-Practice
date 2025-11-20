import { apolloQuery, apolloMutation } from '~/utils/apollo';
import { GET_CVS, GET_CV_BY_ID } from '~/graphql/queries';
import {
  CREATE_CV,
  DELETE_CV,
  UPDATE_CV,
  ADD_CV_PROJECT,
  REMOVE_CV_PROJECT,
} from '~/graphql/mutations';
import type {
  GetCvsResult,
  CreateCvArgs,
  CreateCvResult,
  DeleteCvArgs,
  DeleteCvResult,
  UpdateCvResult,
  UpdateCvArgs,
  AddCvProjectResult,
  AddCvProjectArgs,
  RemoveCvProjectResult,
  RemoveCvProjectArgs,
  RemoveCvProjectInput,
} from '~/graphql/types';
import type { FetchPolicy } from '@apollo/client';
import type { UpdateCvInput, AddCvProjectInput, Cv } from 'cv-graphql';

export async function getCvs(fetchPolicy?: FetchPolicy) {
  const result = await apolloQuery<GetCvsResult>(GET_CVS, {}, fetchPolicy);
  return result.cvs;
}

export async function createCv(cv: CreateCvArgs['cv']) {
  const result = await apolloMutation<CreateCvResult, CreateCvArgs>(
    CREATE_CV,
    { cv },
    {
      refetchQueries: [{ query: GET_CVS }],
      awaitRefetchQueries: true,
    }
  );
  return result.createCv;
}

export async function deleteCv(cvId: string) {
  const result = await apolloMutation<DeleteCvResult, DeleteCvArgs>(
    DELETE_CV,
    { cv: { cvId } },
    {
      refetchQueries: [{ query: GET_CVS }],
      awaitRefetchQueries: true,
    }
  );
  return result.deleteCv;
}

export async function updateCv(cv: UpdateCvInput) {
  const result = await apolloMutation<UpdateCvResult, UpdateCvArgs>(
    UPDATE_CV,
    { cv },
    {
      refetchQueries: [{ query: GET_CVS }],
    }
  );
  return result.updateCv;
}

export async function addCvProject(project: AddCvProjectInput) {
  const result = await apolloMutation<AddCvProjectResult, AddCvProjectArgs>(ADD_CV_PROJECT, {
    project,
  });
  return result.addCvProject;
}

export async function getCvById(args?: { cvId: string }, fetchPolicy?: FetchPolicy) {
  if (!args?.cvId) throw new Error('CV ID is required');

  const result = await apolloQuery<{ cv: Cv }, { cvId: string }>(
    GET_CV_BY_ID,
    { cvId: args.cvId },
    fetchPolicy
  );
  return result.cv;
}

export async function removeCvProject(project: RemoveCvProjectInput) {
  const result = await apolloMutation<RemoveCvProjectResult, RemoveCvProjectArgs>(
    REMOVE_CV_PROJECT,
    { project }
  );
  return result.removeCvProject;
}
