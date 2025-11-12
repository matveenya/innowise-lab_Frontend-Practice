import { apolloQuery, apolloMutation } from '~/utils/apollo';
import { GET_CVS } from '~/graphql/queries';
import { CREATE_CV } from '~/graphql/mutations';
import type { GetCvsResult, CreateCvArgs, CreateCvResult } from '~/graphql/types';

export async function getCvs() {
  const result = await apolloQuery<GetCvsResult>(GET_CVS, {});
  return result.cvs;
}

export async function createCv(cv: CreateCvArgs['cv']) {
  const result = await apolloMutation<CreateCvResult, CreateCvArgs>(
    CREATE_CV,
    { cv },
    { refetchQueries: [{ query: GET_CVS }], awaitRefetchQueries: true }
  );
  return result.createCv;
}
