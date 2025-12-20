import type { Department, Position, Skill } from '~/graphql/types/';
import { getDepartments, getPositions } from '~/services/users';
import { getSkills } from '~/services/skills';

export const useReferencesStore = defineStore('references', () => {
  const departments = ref<Department[]>([]);
  const positions = ref<Position[]>([]);
  const skills = ref<Skill[]>([]);
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
      const [departmentsData, positionsData, skillsData] = await Promise.all([
        getDepartments(),
        getPositions(),
        getSkills(),
      ]);

      departments.value = departmentsData;
      positions.value = positionsData;
      skills.value = skillsData;
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
    skills,
    isLoading,
    loadReferences,
  };
});
