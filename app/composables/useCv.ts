import { getCvById } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { Cv } from 'cv-graphql';

export function useCv() {
  const route = useRoute();

  const cvId = computed(() => route.query.id as string);

  const {
    data: cv,
    loading,
    error,
    refetch,
  } = createQueryAdapter<Cv, { cvId: string }>(getCvById, {
    variables: computed(() => ({ cvId: cvId.value })),
  });

  return {
    cv,
    cvId,
    loading,
    error,
    refetch,
  };
}
