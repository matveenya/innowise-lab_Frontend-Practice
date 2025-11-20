import { useToast } from 'primevue/usetoast';
import { addCvProject, removeCvProject, updateCvProject } from '~/services/cvs';
import type { Ref } from 'vue';

export interface ProjectFormData {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
  responsibilities: string | string[];
}

export function useCvProjects(cvId: Ref<string>, refetch: () => Promise<unknown>) {
  const toast = useToast();

  const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddProject = async (formData: ProjectFormData) => {
    if (!cvId.value) return;
    try {
      const startDateISO = formData.startDate
        ? formatDateToISO(new Date(formData.startDate))
        : formatDateToISO(new Date());
      const endDateISO = formData.endDate ? formatDateToISO(new Date(formData.endDate)) : null;

      await addCvProject({
        cvId: cvId.value,
        projectId: formData.projectId,
        start_date: startDateISO,
        end_date: endDateISO,
        roles: [],
        responsibilities: Array.isArray(formData.responsibilities)
          ? formData.responsibilities
          : [formData.responsibilities],
      });

      await refetch();
      toast.add({ severity: 'success', summary: 'Project added successfully', life: 3000 });
      return true;
    } catch (error) {
      console.error('Failed to add project:', error);
      toast.add({ severity: 'error', summary: 'Failed to add project', life: 3000 });
      return false;
    }
  };

  const handleUpdateProject = async (formData: ProjectFormData) => {
    if (!cvId.value) return;
    try {
      const startDateISO = formData.startDate
        ? formatDateToISO(new Date(formData.startDate))
        : formatDateToISO(new Date());
      const endDateISO = formData.endDate ? formatDateToISO(new Date(formData.endDate)) : null;

      await updateCvProject({
        cvId: cvId.value,
        projectId: formData.projectId,
        start_date: startDateISO,
        end_date: endDateISO,
        roles: [],
        responsibilities: Array.isArray(formData.responsibilities)
          ? formData.responsibilities
          : [formData.responsibilities],
      });

      await refetch();
      toast.add({ severity: 'success', summary: 'Project updated successfully', life: 3000 });
      return true;
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.add({ severity: 'error', summary: 'Failed to update project', life: 3000 });
      return false;
    }
  };

  const handleRemoveProject = async (projectId: string) => {
    if (!cvId.value) return;
    try {
      await removeCvProject({
        cvId: cvId.value,
        projectId: projectId,
      });
      await refetch();
      toast.add({ severity: 'success', summary: 'Project removed successfully', life: 3000 });
      return true;
    } catch (error) {
      console.error('Failed to remove project:', error);
      toast.add({ severity: 'error', summary: 'Failed to remove project', life: 3000 });
      return false;
    }
  };

  return {
    handleAddProject,
    handleUpdateProject,
    handleRemoveProject,
  };
}
