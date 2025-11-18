<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal-title">Delete CV</h3>
    </template>
    <template #body>
      <p class="delete-confirmation-text">
        Are you sure you want to delete CV
        <span class="highlight-text">{{ cvName }}</span
        >?
      </p>
    </template>
    <template #footer>
      <Button variant="outline" @click="closeModal">CANCEL</Button>
      <Button variant="primary" @click="handleDelete">CONFIRM</Button>
    </template>
  </ModalsBaseModal>

  <AppToast />
</template>

<script setup lang="ts">
import { deleteCv as deleteCvService } from '~/services/cvs';
import { useToast } from 'primevue/usetoast';
import Button from '../ui/Button.vue';

const props = defineProps<{
  cvId?: string;
  cvName?: string;
}>();

const isVisible = defineModel<boolean>('isVisible', { required: true });
const emit = defineEmits(['cv-deleted']);
const toast = useToast();

const closeModal = () => {
  isVisible.value = false;
};

const handleDelete = async () => {
  if (!props.cvId) return;

  try {
    await deleteCvService(props.cvId);
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
