import { apolloQuery, apolloMutation } from '~/utils/apollo';
import { GET_CVS } from '~/graphql/queries';
import { CREATE_CV, DELETE_CV } from '~/graphql/mutations';
import type {
  GetCvsResult,
  CreateCvArgs,
  CreateCvResult,
  DeleteCvArgs,
  DeleteCvResult,
} from '~/graphql/types';
import type { FetchPolicy } from '@apollo/client';

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
