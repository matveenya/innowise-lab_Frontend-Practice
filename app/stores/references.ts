import type { Department, Position } from '~/graphql/types/';
import { getDepartments, getPositions } from '~/services/users';

export const useReferencesStore = defineStore('references', () => {
  const departments = ref<Department[]>([]);
  const positions = ref<Position[]>([]);
  const isLoading = ref(false);

  const loadReferences = async () => {
    if (departments.value.length > 0 && positions.value.length > 0) {
      return;
    }

    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    try {
      const [departmentsData, positionsData] = await Promise.all([
        getDepartments(),
        getPositions(),
      ]);

      departments.value = departmentsData;
      positions.value = positionsData;
    } catch (error) {
      console.error(' Failed to load references:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    departments,
    positions,
    isLoading,
    loadReferences,
  };
});
