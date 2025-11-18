<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Create CV</h3>
    </template>

    <template #body>
      <Input id="name" v-model="name" label="Name" />
      <Input id="education" v-model="education" label="Education" />
      <Textarea id="description" v-model="description" label="Description" />
    </template>

    <template #footer>
      <Button variant="outline" @click="closeModal">Cancel</Button>
      <Button variant="primary" :disabled="!isFormValid" @click="handlecreateCv"> Create </Button>
    </template>
  </ModalsBaseModal>

  <AppToast />
</template>

<script setup lang="ts">
import Textarea from '../ui/Textarea.vue';
import { createCv as createCvService } from '~/services/cvs';
import { useToast } from 'primevue/usetoast';
import Button from '../ui/Button.vue';

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['cv-created']);

const authStore = useAuthStore();
const toast = useToast();

const name = ref('');
const education = ref('');
const description = ref('');

const isFormValid = computed(() => {
  return name.value.trim().length > 0;
});

const closeModal = () => {
  isVisible.value = false;
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
