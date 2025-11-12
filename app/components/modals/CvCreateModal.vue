<template>
  <ModalsBaseModal :is-visible="isVisible" @update:is-visible="emit('update:isVisible', $event)">
    <template #header>
      <h3 class="modal__title">Create CV</h3>
    </template>

    <template #body>
      <Input id="name" v-model="name" label="Name" />
      <Input id="education" v-model="education" label="Education" />
      <Textarea id="description" v-model="description" label="Description" />
    </template>

    <template #footer>
      <button class="button button--cancel" @click="closeModal">Cancel</button>
      <button class="button button--create" :disabled="!isFormValid" @click="handlecreateCv">
        Create
      </button>
    </template>
  </ModalsBaseModal>

  <Toast position="top-right" :pt="toastPT" />
</template>

<script setup lang="ts">
import Textarea from '../ui/Textarea.vue';
import { createCv as createCvService } from '~/services/cvs';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

defineProps<{ isVisible: boolean }>();
const emit = defineEmits(['update:isVisible', 'cv-created']);

const authStore = useAuthStore();
const toast = useToast();

const name = ref('');
const education = ref('');
const description = ref('');

const isFormValid = computed(() => {
  return name.value.trim().length > 0;
});

const closeModal = () => {
  emit('update:isVisible', false);
  name.value = '';
  education.value = '';
  description.value = '';
};

const handlecreateCv = async () => {
  if (!isFormValid.value) return;

  try {
    await createCvService({
      name: name.value,
      education: education.value ? education.value : undefined,
      description: description.value,
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
.modal {
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }
}

.button {
  padding: $space-md $space-6xl;
  border-radius: $radius-2xl;
  font-weight: $font-weight-medium;
  cursor: pointer;
  font-size: $font-size-md;
  border: none;

  &--cancel {
    background-color: $button-outline-bg;
    color: $button-outline-text;
    border: $border-outline;

    &:hover {
      background-color: $button-outline-hover;
      border: $border-outline-hover;
      color: $color-text-primary;
    }
  }

  &--create {
    background-color: $button-primary-bg;
    color: $button-primary-text;

    &:hover {
      background-color: $button-primary-hover;
    }

    &:disabled {
      background-color: $button-neutral-bg;
      color: $color-text-primary-disabled;
      cursor: default;
      pointer-events: none;
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
