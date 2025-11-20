<template>
  <section class="cv-details__content">
    <form class="cv-form" @submit.prevent="onSubmit">
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
import { useCv } from '~/composables/useCv';
import { useCvDetails } from '~/composables/useCvDetails';

definePageMeta({ layout: 'cv-details' });

const { cv, cvId } = useCv();
const { handleUpdateCv } = useCvDetails(cvId);

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

const onSubmit = handleSubmit(async values => {
  const success = await handleUpdateCv({
    name: values.name,
    education: values.education,
    description: values.description,
  });

  if (success) {
    resetForm({ values });
  }
});
</script>

<style scoped lang="scss">
.cv-details__content {
  @include container($cv-details-width);
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
