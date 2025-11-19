<template>
  <ModalsBaseModal v-model:is-visible="isVisible" class="cv-add-project-modal">
    <template #header>
      <h3 class="modal-title">Add project</h3>
    </template>

    <template #body>
      <form class="project-form" @submit.prevent="handleCreate">
        <div class="form-row">
          <Select
            id="project"
            v-model="form.projectId"
            label="Project"
            :options="projects || []"
            option-label="name"
            option-value="id"
            :loading="loading"
          />
          <Input id="domain" v-model="form.domain" label="Domain" />
        </div>

        <div class="form-row">
          <DateField id="start-date" v-model="form.startDate" label="Start Date" />
          <DateField id="end-date" v-model="form.endDate" label="End Date" />
        </div>

        <div class="form-row form-row--full">
          <Textarea v-model="form.description" name="description" label="Description" :rows="8" />
        </div>

        <div class="form-row form-row--full">
          <MultiSelect
            v-model="form.environment"
            label="Environment"
            :options="form.environment"
            :disabled="true"
          />
        </div>

        <div class="form-row form-row--full">
          <Textarea
            v-model="form.responsibilities"
            name="responsibilities"
            label="Responsibilities"
            :rows="1"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <Button variant="outline" @click="closeModal">CANCEL</Button>
      <Button variant="primary" :disabled="!isFormValid" @click="handleCreate"> ADD </Button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import Button from '~/components/ui/Button.vue';
import Select from '~/components/ui/Select.vue';
import Textarea from '~/components/ui/Textarea.vue';
import Input from '~/components/ui/Input.vue';
import DateField from '~/components/ui/DateField.vue';
import MultiSelect from '~/components/ui/MultiSelect.vue';
import { getProjects } from '~/services/projects';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { Project } from 'cv-graphql';

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['create']);

const { data: projects, loading } = createQueryAdapter(getProjects);

const form = reactive({
  projectId: null as string | null,
  domain: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
  description: '',
  environment: [] as string[],
  responsibilities: '',
});

const parseDate = (value: string | number | null | undefined): Date | null => {
  if (!value) return null;
  if (!isNaN(Number(value))) {
    return new Date(Number(value));
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

watch(
  () => form.projectId,
  newId => {
    if (!newId || !projects.value) return;

    const selectedProject = projects.value.find((p: Project) => p.id === newId);

    if (selectedProject) {
      form.domain = selectedProject.domain || '';
      form.description = selectedProject.description || '';

      if (Array.isArray(selectedProject.environment)) {
        form.environment = [...selectedProject.environment];
      } else {
        form.environment = [];
      }

      form.startDate = parseDate(selectedProject.start_date);
      form.endDate = parseDate(selectedProject.end_date);
    }
  }
);

const isFormValid = computed(() => !!form.projectId);

const closeModal = () => {
  isVisible.value = false;
  resetForm();
};

const resetForm = () => {
  form.projectId = null;
  form.domain = '';
  form.startDate = null;
  form.endDate = null;
  form.description = '';
  form.environment = [];
  form.responsibilities = '';
};

const handleCreate = () => {
  if (!isFormValid.value) return;

  emit('create', {
    ...form,
    startDate: form.startDate,
    endDate: form.endDate,
    responsibilities:
      typeof form.responsibilities === 'string'
        ? form.responsibilities.split('\n').filter(l => l.trim())
        : form.responsibilities,
  });
  closeModal();
};
</script>

<style lang="scss">
.cv-add-project-modal {
  padding: $space-2xl 0;

  .modal {
    width: $modal-width * 1.5 !important;
  }

  .modal-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin: 0;
  }
}

.project-form {
  @include d-flex(flex-start, stretch, column);
  gap: $space-xl;
  width: 100%;
}

.form-row {
  @include grid-layout(1fr 1fr, auto, $space-3xl);
  width: 100%;

  &--full {
    grid-template-columns: 1fr;
  }
}
</style>
