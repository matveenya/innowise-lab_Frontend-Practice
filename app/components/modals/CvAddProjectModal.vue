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
            :options="projectOptions"
            option-label="name"
            option-value="id"
          />
          <Input id="domain" v-model="form.domain" label="Domain" />
        </div>

        <div class="form-row">
          <DateField id="start-date" v-model="form.startDate" label="Start Date" />
          <DateField id="end-date" v-model="form.endDate" label="End Date" />
        </div>

        <div class="form-row form-row--full">
          <Textarea id="description" v-model="form.description" label="Description" :rows="8" />
        </div>

        <div class="form-row form-row--full">
          <Select
            id="environment"
            v-model="form.environmentId"
            label="Environment"
            :options="environmentOptions"
            option-label="name"
            option-value="id"
          />
        </div>

        <div class="form-row form-row--full">
          <Textarea
            id="responsibilities"
            v-model="form.responsibilities"
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
import Button from '~/components/ui/Button.vue';
import Select from '~/components/ui/Select.vue';
import Textarea from '~/components/ui/Textarea.vue';

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['create']);

const form = reactive({
  projectId: null as string | null,
  domain: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
  description: '',
  environmentId: null as string | null,
  responsibilities: '',
});

const projectOptions = [
  { id: '1', name: 'E-Commerce Platform' },
  { id: '2', name: 'Internal CRM' },
  { id: '3', name: 'Mobile Banking App' },
];

const environmentOptions = [
  { id: 'dev', name: 'Development' },
  { id: 'staging', name: 'Staging' },
  { id: 'prod', name: 'Production' },
];

const isFormValid = computed(() => {
  return !!form.projectId;
});

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
  form.environmentId = null;
  form.responsibilities = '';
};

const handleCreate = () => {
  if (!isFormValid.value) return;

  emit('create', { ...form });
  closeModal();
};
</script>

<style lang="scss">
.cv-add-project-modal {
  padding: $space-2xl 0;

  .modal {
    width: $modal-width * 1.5 !important;

    &-title {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
      margin: 0;
    }
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
