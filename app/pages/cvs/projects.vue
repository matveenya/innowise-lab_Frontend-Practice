<template>
  <div class="cvs-projects">
    <div class="cvs-projects__controls-and-button">
      <SearchInput v-model="searchTerm" placeholder="Search" />
      <Button variant="ghost-secondary" class="create-button" @click="isAddModalVisible = true">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD PROJECT
      </Button>
    </div>

    <CvsTable
      :data="filteredProjects"
      :columns="columns"
      sort-field="name"
      @reset-search="searchTerm = ''"
    >
      <template #name="{ data }">
        <span class="project-name">{{ data.name }}</span>
      </template>

      <template #date="{ data, field }">
        <template v-if="typeof field === 'string'">
          <template v-if="field === 'end_date'">
            {{ data.end_date ? formatDateNumeric(data.end_date) : 'Till now' }}
          </template>
          <template v-else>
            {{ formatDateNumeric(data[field as keyof typeof data]) }}
          </template>
        </template>
      </template>

      <template #actions="{ data }">
        <button class="actions-button" @click="event => openActionMenu(event, data)">
          <Icon name="mdi:dots-vertical" size="1.5em" mode="svg" />
        </button>
      </template>

      <template #expansion="{ data }">
        <div class="project-details">
          <div v-if="data.description" class="project-details__description">
            {{ data.description }}
          </div>

          <div v-if="data.responsibilities?.length" class="project-details__chips">
            <span v-for="(resp, i) in data.responsibilities" :key="i" class="chip">
              {{ resp }}
            </span>
          </div>
        </div>
      </template>
    </CvsTable>

    <ModalsCvAddProjectModal v-model:is-visible="isAddModalVisible" @create="handleProjectAdded" />

    <ModalsCvUpdateProjectModal
      v-model:is-visible="isUpdateModalVisible"
      :project="selectedProject"
      @update="handleProjectUpdated"
    />

    <CvsActionMenu ref="actionMenuRef" :items="menuItems" />

    <ModalsCvDeleteModal
      v-model:is-visible="isDeleteModalVisible"
      title="Remove project"
      message-prefix="Are you sure you want to remove project"
      :item-name="selectedProject?.name"
      :item-id="selectedProject?.id"
      :use-default-cv-service="false"
      @confirm="handleRemoveProject"
    />

    <AppToast />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import { addCvProject, removeCvProject, updateCvProject } from '~/services/cvs';
import { formatDateNumeric } from '~/utils/dateUtils';
import { ref, computed } from 'vue';
import type { CvProject } from 'cv-graphql';
import { PROJECTS_TABLE_COLUMNS } from '~/constants/projects';
import { useCv } from '~/composables/useCv';
import CvsActionMenu, { type ActionMenuItem } from '~/components/cvs/ActionMenu.vue';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: 'cv-details',
});

const { cv, cvId, refetch } = useCv();
const toast = useToast();

const searchTerm = ref('');
const isAddModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const isUpdateModalVisible = ref(false);
const selectedProject = ref<CvProject | null>(null);
const actionMenuRef = ref<InstanceType<typeof CvsActionMenu> | null>(null);

const filteredProjects = computed<CvProject[]>(() => {
  if (!cv.value?.projects) return [];
  const term = searchTerm.value.toLowerCase();
  if (!term) return cv.value.projects;

  return cv.value.projects.filter((p: CvProject) => p.name && p.name.toLowerCase().includes(term));
});

const columns = PROJECTS_TABLE_COLUMNS;

const menuItems = computed<ActionMenuItem[]>(() => [
  {
    label: 'Update project',
    command: () => {
      isUpdateModalVisible.value = true;
    },
  },
  {
    label: 'Remove project',
    command: () => {
      isDeleteModalVisible.value = true;
    },
  },
]);

const openActionMenu = (event: Event, project: CvProject) => {
  selectedProject.value = project;
  actionMenuRef.value?.toggle(event);
};

interface ProjectFormData {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
  responsibilities: string | string[];
}

const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleProjectAdded = async (formData: ProjectFormData) => {
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
      responsibilities: formData.responsibilities
        ? Array.isArray(formData.responsibilities)
          ? formData.responsibilities
          : [formData.responsibilities]
        : [],
    });

    await refetch();
    toast.add({ severity: 'success', summary: 'Project added successfully', life: 3000 });
  } catch (error) {
    console.error('Failed to add project:', error);
    toast.add({ severity: 'error', summary: 'Failed to add project', life: 3000 });
  }
};

const handleProjectUpdated = async (formData: ProjectFormData) => {
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
      responsibilities: formData.responsibilities
        ? Array.isArray(formData.responsibilities)
          ? formData.responsibilities
          : [formData.responsibilities]
        : [],
    });

    await refetch();
    toast.add({ severity: 'success', summary: 'Project updated successfully', life: 3000 });
  } catch (error) {
    console.error('Failed to update project:', error);
    toast.add({ severity: 'error', summary: 'Failed to update project', life: 3000 });
  }
};

const handleRemoveProject = async () => {
  if (!selectedProject.value?.project?.id || !cvId.value) return;

  try {
    await removeCvProject({
      cvId: cvId.value,
      projectId: selectedProject.value.project.id,
    });

    await refetch();
    isDeleteModalVisible.value = false;
    toast.add({ severity: 'success', summary: 'Project removed successfully', life: 3000 });
  } catch (error) {
    console.error('Failed to remove project:', error);
    toast.add({ severity: 'error', summary: 'Failed to remove project', life: 3000 });
  }
};
</script>

<style lang="scss" scoped>
.cvs-projects {
  height: 100%;
  @include d-flex(flex-start, stretch, column);

  &__controls-and-button {
    @include d-flex(space-between, center);
    margin-bottom: $space-3xl;
    margin-right: $space-2xl;

    .create-button {
      padding: $space-lg $space-6xl;
      border-radius: $radius-2xl;
    }
  }
}

.project-name {
  font-size: $font-size-sm;
}

.project-details {
  &__description {
    margin-bottom: $space-sm;
  }

  &__chips {
    @include d-flex(flex-start, center, row, wrap);
    gap: $space-xs;
    margin-top: $space-sm;
  }

  .chip {
    background-color: $color-border-table;
    border-radius: $radius-xl;
    padding: $space-2xs $space-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    white-space: nowrap;
  }
}
</style>
