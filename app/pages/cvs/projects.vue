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

    <ModalsCvAddProjectModal v-model:is-visible="isAddModalVisible" @create="onProjectAdd" />

    <ModalsCvUpdateProjectModal
      v-model:is-visible="isUpdateModalVisible"
      :project="selectedProject"
      @update="onProjectUpdate"
    />

    <CvsActionMenu ref="actionMenuRef" :items="menuItems" />

    <ModalsCvDeleteModal
      v-model:is-visible="isDeleteModalVisible"
      title="Remove project"
      message-prefix="Are you sure you want to remove project"
      :item-name="selectedProject?.name"
      :item-id="selectedProject?.id"
      :use-default-cv-service="false"
      @confirm="onProjectRemove"
    />

    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '~/components/ui/Button.vue';
import { formatDateNumeric } from '~/utils/dateUtils';
import type { CvProject } from 'cv-graphql';
import { PROJECTS_TABLE_COLUMNS } from '~/constants/projects';
import { useCv } from '~/composables/useCv';
import { useCvProjects, type ProjectFormData } from '~/composables/useCvProjects';
import CvsActionMenu, { type ActionMenuItem } from '~/components/cvs/ActionMenu.vue';

definePageMeta({ layout: 'cv-details' });

const { cv, cvId, refetch } = useCv();
const { handleAddProject, handleUpdateProject, handleRemoveProject } = useCvProjects(cvId, refetch);

const searchTerm = ref('');
const isAddModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const isUpdateModalVisible = ref(false);
const selectedProject = ref<CvProject | null>(null);
const actionMenuRef = ref<InstanceType<typeof CvsActionMenu> | null>(null);
const columns = PROJECTS_TABLE_COLUMNS;

const filteredProjects = computed<CvProject[]>(() => {
  if (!cv.value?.projects) return [];
  const term = searchTerm.value.toLowerCase();
  if (!term) return cv.value.projects;
  return cv.value.projects.filter((p: CvProject) => p.name?.toLowerCase().includes(term));
});

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

const onProjectAdd = async (data: ProjectFormData) => {
  await handleAddProject(data);
};

const onProjectUpdate = async (data: ProjectFormData) => {
  await handleUpdateProject(data);
};

const onProjectRemove = async () => {
  if (selectedProject.value?.project?.id) {
    const success = await handleRemoveProject(selectedProject.value.project.id);
    if (success) isDeleteModalVisible.value = false;
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
