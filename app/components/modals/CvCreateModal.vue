<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Create CV</h3>
    </template>

    <template #body>
      <FloatLabelInput name="name" label="Name" placeholder=" " type="text" />
      <FloatLabelInput name="education" label="Education" placeholder=" " type="text" />
      <Textarea name="description" label="Description" />
    </template>

    <template #footer>
      <Button variant="outline" @click="closeModal">Cancel</Button>
      <Button
        variant="primary"
        :disabled="!values.name && !values.education && !values.description"
        @click="handleCreateCv"
      >
        Create
      </Button>
    </template>
  </ModalsBaseModal>

  <AppToast />
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { cvSchema, type CvForm } from '~/utils/schemas/cvValidationSchema';
import { createCv as createCvService } from '~/services/cvs';
import { useToast } from 'primevue/usetoast';
import Textarea from '../ui/Textarea.vue';
import Button from '../ui/Button.vue';

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['cv-created']);

const authStore = useAuthStore();
const toast = useToast();

const { handleSubmit, resetForm, values } = useForm<CvForm>({
  validationSchema: toTypedSchema(cvSchema),
  initialValues: {
    name: '',
    education: '',
    description: '',
  },
});

const closeModal = () => {
  isVisible.value = false;
  resetForm();
};

const handleCreateCv = handleSubmit(async values => {
  try {
    await createCvService({
      name: values.name,
      education: values.education || undefined,
      description: values.description || '',
      userId: authStore.user?.id,
    });

    emit('cv-created');
    closeModal();

    toast.add({
      severity: 'success',
      summary: 'CV was created',
      life: 3000,
    });
  } catch (error) {
    console.error('Failed to create CV:', error);
    toast.add({
      severity: 'error',
      summary: 'Failed to create CV',
      life: 3000,
    });
  }
});
</script>

<style scoped lang="scss">
.modal {
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }
}
</style>
