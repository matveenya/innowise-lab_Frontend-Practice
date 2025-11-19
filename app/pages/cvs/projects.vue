<template>
  <div class="cvs-projects">
    <div class="cvs-projects__controls-and-button">
      <SearchInput v-model="searchTerm" placeholder="Search" />
      <Button variant="ghost-secondary" class="create-button" @click="isAddModalVisible = true">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD PROJECT
      </Button>
    </div>

    <table class="cvs-projects__table">
      <thead>
        <tr class="cvs-projects__table-header-row">
          <th class="table-header__item sortable">
            Name
            <Icon name="ic:baseline-arrow-upward" size="1em" mode="svg" />
          </th>
          <th class="table-header__item">Domain</th>
          <th class="table-header__item">Start Date</th>
          <th class="table-header__item">End Date</th>
          <th class="table-header__item table-header__item--actions"></th>
        </tr>
      </thead>

      <tbody>
        <template v-for="project in filteredProjects" :key="project.id">
          <!-- Основная строка -->
          <tr class="project-row">
            <td class="project-name">{{ project.name }}</td>
            <td>{{ project.domain }}</td>
            <td>{{ formatDate(project.start_date) }}</td>
            <td>{{ project.end_date ? formatDate(project.end_date) : 'Till now' }}</td>
            <td class="actions-cell">
              <button class="action-btn">
                <Icon name="mdi:dots-vertical" size="1.5em" />
              </button>
            </td>
          </tr>

          <!-- Строка деталей -->
          <tr class="project-details-row">
            <td colspan="5">
              <div class="details-content">
                <!-- Description -->
                <div v-if="project.description" class="details-section">
                  <p class="description-text">{{ project.description }}</p>
                </div>

                <!-- Responsibilities (в виде чипсов) -->
                <div
                  v-if="project.responsibilities && project.responsibilities.length"
                  class="details-section"
                >
                  <div class="chips-container">
                    <span
                      v-for="(resp, index) in project.responsibilities"
                      :key="index"
                      class="chip"
                    >
                      {{ resp }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>

        <tr v-if="!filteredProjects.length">
          <td colspan="5" class="no-results-cell">
            <p class="no-results">No results found</p>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalsCvAddProjectModal v-model:is-visible="isAddModalVisible" @create="handleProjectAdded" />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import { useRoute } from 'vue-router';
import { getCvById, addCvProject } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import { formatDate } from '~/utils/dateUtils';
import { useToast } from 'primevue/usetoast';
import { ref, computed } from 'vue';
import type { Cv, CvProject } from 'cv-graphql';

definePageMeta({
  layout: 'cv-details',
});

const route = useRoute();
const cvId = route.query.id as string;
const toast = useToast();

const searchTerm = ref('');
const isAddModalVisible = ref(false);

const { data: cv, refetch } = createQueryAdapter<Cv, { cvId: string }>(getCvById, {
  variables: { cvId },
});

const filteredProjects = computed<CvProject[]>(() => {
  if (!cv.value?.projects) return [];
  const term = searchTerm.value.toLowerCase();
  return cv.value.projects.filter((p: CvProject) => p.name && p.name.toLowerCase().includes(term));
});

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
      cvId,
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

    toast.add({ severity: 'success', summary: 'Project added successfully', life: 3000 });
    await refetch();
  } catch (error) {
    console.error('Failed to add project:', error);
    toast.add({ severity: 'error', summary: 'Failed to add project', life: 3000 });
  }
};
</script>

<style lang="scss" scoped>
.cvs-projects {
  &__controls-and-button {
    @include d-flex(space-between, center);
    margin-bottom: $space-3xl;

    .create-button {
      padding: $space-lg $space-6xl;
      border-radius: $radius-2xl;
      margin-right: $space-2xl;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: $space-md;

    td,
    th {
      border: none;
    }

    .cvs-projects__table-header-row {
      height: $space-4xl;
      @include border-bottom($color-border-subtle, 1px);
    }

    .table-header__item {
      color: $color-text-primary;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      text-align: left;
      padding-bottom: $space-md;
      cursor: pointer;

      &.sortable {
        @include d-flex(flex-start, center);
        gap: $space-2xs;
      }
    }

    .project-row {
      td {
        padding: $space-lg $space-lg $space-xs $space-lg;
        color: $color-text-primary;
        font-size: $font-size-sm;
        vertical-align: top;
        border-bottom: none !important;
      }

      .project-name {
        font-weight: $font-weight-bold;
        font-size: $font-size-md;
      }
    }

    .actions-cell {
      text-align: right;
      padding-right: $space-xl;
    }

    .action-btn {
      @include d-flex(center, center);
      background: transparent;
      border: none;
      color: $color-text-secondary;
      cursor: pointer;
      padding: $space-xs;
      border-radius: $radius-rounded;
      transition:
        background-color 0.2s,
        color 0.2s;

      &:hover {
        color: $color-text-primary;
        background-color: rgba($color-text-primary, 0.1);
      }
    }

    .project-details-row {
      td {
        padding: 0 $space-lg $space-xl $space-lg;
        @include border-bottom($color-border-table, 1px);
      }

      .details-content {
        @include d-flex(flex-start, stretch, column);
        gap: $space-sm;
      }

      .description-text {
        color: $color-text-muted;
        font-size: $font-size-sm;
        line-height: 1.5;
        margin-top: $space-xs;
      }

      .details-section {
        margin-top: $space-xs;
      }

      .chips-container {
        @include d-flex(flex-start, flex-start, row, wrap);
        gap: $space-sm;
      }

      .chip {
        background-color: $color-border-table;
        border-radius: $radius-xl;
        padding: $space-xs $space-md;
        font-size: $font-size-sm;
        color: $color-text-secondary;
        white-space: nowrap;
      }
    }
  }

  .no-results-cell {
    padding-top: $space-3xl;
    text-align: center;
    border-bottom: none;

    .no-results {
      color: $color-text-primary;
      font-size: $font-size-2xl;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
