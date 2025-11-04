<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">Create CV</h3>
          <button class="modal__close" @click="closeModal">✕</button>
        </div>

        <div class="modal__body">
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
        </div>

        <div class="modal__footer">
          <button class="button button--cancel" @click="closeModal">Cancel</button>
          <button class="button button--create" @click="createCv">Create</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ isVisible: boolean }>();
const emit = defineEmits(['update:isVisible']);

const closeModal = () => emit('update:isVisible', false);

const createCv = () => {
  closeModal();
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: $color-bg-modal;
  @include d-flex(center, center);
  z-index: 1000;

  .modal {
    background-color: $color-primary;
    border-radius: $radius-xl;
    width: $modal-width;
    max-width: calc(100vw - 48px);
    color: $color-text-primary;
    box-shadow: $shadow-md;
    @include d-flex(flex-start, stretch, column);
    overflow: hidden;
    box-sizing: border-box;

    &__header {
      @include d-flex(space-between, center);
      padding: $space-xl $space-2xl;
      background-color: transparent;

      .modal__title {
        font-size: $font-size-xl;
        font-weight: $font-weight-medium;
        color: $color-text-primary;
        margin: 0;
      }

      .modal__close {
        background: none;
        border: none;
        color: $color-text-secondary;
        font-size: $font-size-lg;
        cursor: pointer;
        padding: $space-xs;
        line-height: 1;

        &:hover {
          color: $color-text-primary;
        }
      }
    }

    &__body {
      padding: $space-2xl;
      @include d-flex(flex-start, stretch, column);
      gap: $space-xl;
      background-color: transparent;
      box-sizing: border-box;

      .modal__field {
        position: relative;
        width: 100%;

        .modal__input,
        .modal__textarea {
          width: 100%;
          background-color: $color-primary;
          border: 1px solid $color-border-subtle;
          border-radius: $radius-md;
          padding: $space-xl $space-md $space-sm;
          color: $color-text-primary;
          font-size: $font-size-md;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;

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

    &__footer {
      @include d-flex(flex-end, center);
      gap: $space-lg;
      padding: $space-xl $space-2xl;
      background-color: transparent;

      .button {
        padding: $space-md $space-6xl;
        border-radius: $radius-2xl;
        font-weight: $font-weight-medium;
        cursor: pointer;
        font-size: $font-size-md;
        box-sizing: border-box;
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
    }
  }
}
</style>
