<template>
  <ModalsBaseModal :is-visible="isVisible" @update:is-visible="emit('update:isVisible', $event)">
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
      <button class="button button--cancel" @click="closeModal">CANCEL</button>
      <button class="button button--confirm" @click="handleDelete">CONFIRM</button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import { deleteCv as deleteCvService } from '~/services/cvs';

const props = defineProps<{
  isVisible: boolean;
  cvId?: string;
  cvName?: string;
}>();

const emit = defineEmits(['update:isVisible', 'cv-deleted']);

const closeModal = () => {
  emit('update:isVisible', false);
};

const handleDelete = async () => {
  if (!props.cvId) return;

  try {
    await deleteCvService(props.cvId);
    emit('cv-deleted');
    closeModal();
  } catch (err) {
    console.error('Error deleting CV:', err);
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

.button {
  padding: $space-md $space-6xl;
  border-radius: $radius-2xl;
  font-weight: $font-weight-bold;
  cursor: pointer;
  font-size: $font-size-sm;
  text-transform: uppercase;
  border: none;
  min-width: 120px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &--cancel {
    background-color: transparent;
    color: $color-text-muted;
    border: $border-outline;

    &:hover {
      background-color: $button-outline-hover;
      color: $color-text-primary;
      border-color: $color-text-primary;
    }
  }

  &--confirm {
    background-color: $color-secondary;
    color: $color-text-primary;

    &:hover {
      background-color: $color-secondary-hover;
    }
  }
}
</style>
