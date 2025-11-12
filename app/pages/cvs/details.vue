<template>
  <section class="cv-details__content">
    <form class="cv-form" @submit.prevent="handleUpdate">
      <Input id="cv-name" v-model="name" label="Name" />
      <Input id="cv-education" v-model="education" label="Education" />
      <Textarea id="cv-description" v-model="description" label="Description" />

      <div class="cv-form__actions">
        <button type="submit" class="cv-form__button" :disabled="!isModified">Update</button>
      </div>
    </form>

    <Toast position="top-right" :pt="toastPT" />
  </section>
</template>

<script setup lang="ts">
import Textarea from '~/components/ui/Textarea.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { getCvs, updateCv } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';

definePageMeta({
  layout: 'cv-details',
});

const route = useRoute();
const toast = useToast();

const name = ref('');
const education = ref('');
const description = ref('');

const initialName = ref('');
const initialEducation = ref('');
const initialDescription = ref('');

const { data: cvs } = createQueryAdapter(getCvs);

watch(
  [cvs, () => route.query.id],
  ([newCvs, cvId]) => {
    if (!newCvs || !cvId) return;

    const foundCv = newCvs.find(cv => cv.id === cvId);

    if (foundCv) {
      name.value = foundCv.name || '';
      education.value = foundCv.education || '';
      description.value = foundCv.description || '';

      initialName.value = foundCv.name || '';
      initialEducation.value = foundCv.education || '';
      initialDescription.value = foundCv.description || '';
    }
  },
  { immediate: true }
);

const isModified = computed(() => {
  return (
    name.value.trim() !== initialName.value.trim() ||
    education.value.trim() !== initialEducation.value.trim() ||
    description.value.trim() !== initialDescription.value.trim()
  );
});

const handleUpdate = async () => {
  const cvId = route.query.id?.toString();
  if (!cvId) return;

  try {
    await updateCv({
      cvId,
      name: name.value,
      education: education.value,
      description: description.value,
    });

    initialName.value = name.value;
    initialEducation.value = education.value;
    initialDescription.value = description.value;

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
};

const toastPT = {
  root: { class: 'toast-root' },
  message: { class: 'toast-message' },
  content: { class: 'toast-content' },
  summary: { class: 'toast-summary' },
  icon: { class: 'hidden' },
  closeButton: { class: 'hidden' },
};
</script>

<style lang="scss">
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
    background-color: $button-primary-bg;
    color: $button-primary-text;
    border: none;
    border-radius: $radius-2xl;
    box-shadow: $shadow-md;
    padding: $space-lg;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $button-primary-hover;
    }

    &:disabled {
      background-color: $button-neutral-bg;
      color: $color-text-primary-disabled;
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    }
  }
}

.toast-root {
  opacity: 0.95;
  width: auto;
}

.toast-message {
  background-color: $color-text-primary;
  border-radius: $radius-sm;
  box-shadow: $shadow-md;
  overflow: hidden;
  padding-bottom: $space-lg;
}

.toast-content {
  @include d-flex(center, flex-start);
  border: none;
}

.toast-summary {
  color: $color-primary;
  font-size: $font-size-md;
  font-weight: $font-weight-regular;
  padding: $space-2xs $space-5xl;
}

.hidden {
  display: none;
}
</style>
