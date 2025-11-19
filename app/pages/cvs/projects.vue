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

      <template #actions>
        <button class="actions-button">
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
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import { addCvProject } from '~/services/cvs';
import { formatDateNumeric } from '~/utils/dateUtils';
import { ref, computed } from 'vue';
import type { CvProject } from 'cv-graphql';
import { PROJECTS_TABLE_COLUMNS } from '~/constants/projects';
import { useCv } from '~/composables/useCv';

definePageMeta({
  layout: 'cv-details',
});

const { cv, cvId, refetch } = useCv();

const searchTerm = ref('');
const isAddModalVisible = ref(false);

const filteredProjects = computed<CvProject[]>(() => {
  if (!cv.value?.projects) return [];
  const term = searchTerm.value.toLowerCase();
  if (!term) return cv.value.projects;

  return cv.value.projects.filter((p: CvProject) => p.name && p.name.toLowerCase().includes(term));
});

const columns = PROJECTS_TABLE_COLUMNS;

interface ProjectFormData {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
  responsibilities: string | string[];
}

const handleProjectAdded = async (formData: ProjectFormData) => {
  try {
    const startDateISO = formData.startDate
      ? new Date(formData.startDate).toISOString()
      : new Date().toISOString();
    const endDateISO = formData.endDate ? new Date(formData.endDate).toISOString() : null;

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
  } catch (error) {
    console.error('Failed to add project:', error);
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
