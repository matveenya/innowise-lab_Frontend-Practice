<template>
  <ModalsBaseModal :is-visible="isVisible" @update:is-visible="emit('update:isVisible', $event)">
    <template #header>
      <h3 class="modal__title">Create CV</h3>
    </template>

    <template #body>
      <div class="modal__field">
        <input id="name" type="text" class="modal__input" placeholder=" " />
        <label for="name" class="modal__label">Name</label>
      </div>

      <div class="modal__field">
        <input id="education" type="text" class="modal__input" placeholder=" " />
        <label for="education" class="modal__label">Education</label>
      </div>

      <div class="modal__field">
        <textarea id="description" class="modal__textarea" placeholder=" " rows="8"></textarea>
        <label for="description" class="modal__label">Description</label>
      </div>
    </template>

    <template #footer>
      <button class="button button--cancel" @click="closeModal">Cancel</button>
      <button class="button button--create" @click="createCv">Create</button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
defineProps<{ isVisible: boolean }>();
const emit = defineEmits(['update:isVisible']);

const closeModal = () => emit('update:isVisible', false);
const createCv = () => closeModal();
</script>

<style scoped lang="scss">
.modal {
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }

  &__field {
    position: relative;
    width: 100%;

    .modal__input,
    .modal__textarea {
      width: 100%;
      background-color: $color-primary;
      border: $border-subtle;
      border-radius: $radius-md;
      padding: $space-xl $space-md $space-sm;
      color: $color-text-primary;
      font-size: $font-size-md;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: $color-text-primary;
      }

      &:focus {
        border-color: $color-secondary;
      }

      &:focus + .modal__label,
      &:not(:placeholder-shown) + .modal__label {
        top: -1 * $modal-distance-top;
        left: $space-md;
        font-size: $font-size-sm;
        color: $color-secondary;
        background-color: $color-primary;
        padding: 0 $space-xs;
      }
    }

    .modal__textarea {
      resize: none;
      padding-top: $space-2xl;
    }

    .modal__label {
      position: absolute;
      top: $modal-distance-top * 2;
      left: $space-md;
      color: $color-text-secondary;
      font-size: $font-size-md;
      pointer-events: none;
      background-color: transparent;
      padding: 0 $space-2xs;
      transition: all 0.2s ease;
    }
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
    }
  }

  &--create {
    background-color: $button-neutral-bg;
    color: $color-text-primary-disabled;

    &:hover {
      background-color: $button-neutral-hover;
      color: $color-text-primary;
    }
  }
}
</style>
