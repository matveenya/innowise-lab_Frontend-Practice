<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal-title">{{ title }}</h3>
    </template>
    <template #body>
      <p class="delete-confirmation-text">
        {{ messagePrefix }}
        <span class="highlight-text">{{ itemName }}</span
        >?
      </p>
    </template>
    <template #footer>
      <Button variant="outline" @click="closeModal">CANCEL</Button>
      <Button variant="primary" :disabled="isLoading" @click="handleConfirm">CONFIRM</Button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import { deleteCv as deleteCvService } from '~/services/cvs';
import { useToast } from 'primevue/usetoast';
import Button from '../ui/Button.vue';

const props = withDefaults(
  defineProps<{
    itemId?: string;
    itemName?: string;
    title?: string;
    messagePrefix?: string;
    loading?: boolean;
    useDefaultCvService?: boolean;
  }>(),
  {
    title: 'Delete CV',
    messagePrefix: 'Are you sure you want to delete CV',
    useDefaultCvService: true,
    loading: false,
    itemId: '',
    itemName: '',
  }
);

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['cv-deleted', 'confirm']);
const toast = useToast();

const isLoading = ref(false);

const closeModal = () => {
  isVisible.value = false;
};

const handleConfirm = async () => {
  if (!props.useDefaultCvService) {
    emit('confirm', props.itemId);
    return;
  }

  if (!props.itemId) return;

  isLoading.value = true;
  try {
    await deleteCvService(props.itemId);
    emit('cv-deleted');
    closeModal();

    toast.add({
      severity: 'success',
      summary: 'CV was deleted',
      life: 3000,
    });
  } catch (err) {
    console.error('Error deleting CV:', err);
    toast.add({
      severity: 'error',
      summary: 'Failed to delete CV',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.modal-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin: 0;
}

.delete-confirmation-text {
  font-size: $font-size-md;
  color: $color-text-secondary;
  line-height: 1.5;

  .highlight-text {
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}
</style>
