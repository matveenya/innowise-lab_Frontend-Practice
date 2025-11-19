<template>
  <section class="cv-details__content">
    <form class="cv-form" @submit.prevent="handleUpdate">
      <FloatLabelInput name="name" label="Name" placeholder=" " type="text" />
      <FloatLabelInput name="education" label="Education" placeholder=" " type="text" />
      <Textarea name="description" label="Description" />

      <div class="cv-form__actions">
        <Button
          variant="primary"
          type="submit"
          class="cv-form__button"
          :disabled="!meta.dirty || !meta.valid || isSubmitting"
        >
          Update
        </Button>
      </div>
    </form>

    <AppToast />
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import Textarea from '~/components/ui/Textarea.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { cvSchema, type CvForm } from '~/utils/schemas/cvValidationSchema';
import { updateCv } from '~/services/cvs';
import { useToast } from 'primevue/usetoast';
import { useCv } from '~/composables/useCv';

definePageMeta({
  layout: 'cv-details',
});

const toast = useToast();
const { cv, cvId } = useCv();

const { handleSubmit, resetForm, meta, isSubmitting } = useForm<CvForm>({
  validationSchema: toTypedSchema(cvSchema),
});

watch(
  cv,
  newCv => {
    if (newCv) {
      resetForm({
        values: {
          name: newCv.name || '',
          education: newCv.education || '',
          description: newCv.description || '',
        },
      });
    }
  },
  { immediate: true }
);

const handleUpdate = handleSubmit(async values => {
  if (!cvId.value) return;

  try {
    await updateCv({
      cvId: cvId.value,
      name: values.name,
      education: values.education || undefined,
      description: values.description || '',
    });

    resetForm({ values });

    toast.add({
      severity: 'success',
      summary: 'CV was updated',
      life: 3000,
    });
  } catch (error) {
    console.error('Failed to update CV:', error);
    toast.add({
      severity: 'error',
      summary: 'Failed to update CV',
      life: 3000,
    });
  }
});
</script>

<style scoped lang="scss">
.cv-details {
  &__content {
    @include container($cv-details-width);
  }
}

.cv-form {
  @include d-flex(flex-start, stretch, column);
  gap: $space-3xl;

  &__actions {
    @include d-flex(flex-end, center);
  }

  &__button {
    width: $button-width-details;

    &:disabled {
      box-shadow: none;
    }
  }
}
</style>
