import { getCvs } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';

export function useCvs() {
  const searchTerm = ref('');

  const { data: cvs, loading, error, refetch } = createQueryAdapter(getCvs);

  const filteredCvs = computed(() => {
    if (!cvs.value) return [];

    const term = searchTerm.value.trim().toLowerCase();
    if (!term) return cvs.value;

    return cvs.value.filter(cv => cv.name.toLowerCase().includes(term));
  });

  return {
    cvs,
    filteredCvs,
    searchTerm,
    loading,
    error,
    refetch,
  };
}
