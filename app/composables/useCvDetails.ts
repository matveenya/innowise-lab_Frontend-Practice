import { useToast } from 'primevue/usetoast';
import { updateCv } from '~/services/cvs';
import type { Ref } from 'vue';

export interface CvDetailsForm {
  name: string;
  education?: string;
  description: string;
}

export function useCvDetails(cvId: Ref<string>) {
  const toast = useToast();

  const handleUpdateCv = async (values: CvDetailsForm) => {
    if (!cvId.value) return false;

    try {
      await updateCv({
        cvId: cvId.value,
        name: values.name,
        education: values.education,
        description: values.description,
      });

      toast.add({
        severity: 'success',
        summary: 'CV was updated',
        life: 3000,
      });
      return true;
    } catch (error) {
      console.error('Failed to update CV:', error);
      toast.add({
        severity: 'error',
        summary: 'Failed to update CV',
        life: 3000,
      });
      return false;
    }
  };

  return {
    handleUpdateCv,
  };
}
