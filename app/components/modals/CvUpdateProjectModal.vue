<template>
  <ModalsBaseModal v-model:is-visible="isVisible" class="cv-update-project-modal">
    <template #header>
      <h3 class="modal-title">Update project</h3>
    </template>

    <template #body>
      <form class="project-form" @submit.prevent="handleUpdate">
        <div class="form-row">
          <Input id="project-name" v-model="form.projectName" label="Project" :disabled="true" />
          <Input id="domain" v-model="form.domain" label="Domain" :disabled="true" />
        </div>

        <div class="form-row">
          <DateField id="start-date" v-model="form.startDate" label="Start Date" />
          <DateField id="end-date" v-model="form.endDate" label="End Date" />
        </div>

        <div class="form-row form-row--full">
          <Textarea
            v-model="form.description"
            name="description"
            label="Description"
            :rows="8"
            :disabled="true"
          />
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
      <Button variant="primary" :disabled="!isDirty" @click="handleUpdate">UPDATE</Button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue';
import Button from '~/components/ui/Button.vue';
import Textarea from '~/components/ui/Textarea.vue';
import Input from '~/components/ui/Input.vue';
import DateField from '~/components/ui/DateField.vue';
import MultiSelect from '~/components/ui/MultiSelect.vue';
import { safeParseDate } from '~/utils/dateUtils';
import type { CvProject } from 'cv-graphql';

const props = defineProps<{
  project: CvProject | null;
}>();

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['update']);

const form = reactive({
  projectName: '',
  domain: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
  description: '',
  environment: [] as string[],
  responsibilities: '',
});

const getDateTimestamp = (date: Date | null | undefined): number => {
  return date ? date.getTime() : 0;
};

const isDirty = computed(() => {
  if (!props.project) return false;

  const originalStart = getDateTimestamp(safeParseDate(props.project.start_date));
  const currentStart = getDateTimestamp(form.startDate);
  if (originalStart !== currentStart) return true;

  const originalEnd = getDateTimestamp(safeParseDate(props.project.end_date));
  const currentEnd = getDateTimestamp(form.endDate);
  if (originalEnd !== currentEnd) return true;

  const originalResp = (props.project.responsibilities || []).join('\n');
  if (form.responsibilities.trim() !== originalResp.trim()) return true;

  return false;
});

watch(
  () => props.project,
  newProject => {
    if (newProject) {
      form.projectName = newProject.name || '';
      form.domain = newProject.domain || '';
      form.description = newProject.description || '';
      form.environment = newProject.environment ? [...newProject.environment] : [];
      form.startDate = safeParseDate(newProject.start_date);
      form.endDate = safeParseDate(newProject.end_date);
      form.responsibilities = newProject.responsibilities
        ? newProject.responsibilities.join('\n')
        : '';
    }
  },
  { immediate: true }
);

const closeModal = () => {
  isVisible.value = false;
};

const handleUpdate = () => {
  if (!props.project) return;

  emit('update', {
    projectId: props.project.project ? props.project.project.id : props.project.id,
    startDate: form.startDate,
    endDate: form.endDate,
    responsibilities:
      typeof form.responsibilities === 'string'
        ? form.responsibilities.split('\n').filter(l => l.trim())
        : [],
  });
  closeModal();
};
</script>

<style lang="scss">
.cv-update-project-modal {
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
