<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <header v-if="$slots.header" class="modal__header">
          <slot name="header" />
          <button class="modal__close" @click="closeModal">✕</button>
        </header>

        <section v-if="$slots.body" class="modal__body">
          <slot name="body" />
        </section>

        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits(['update:isVisible']);

const closeModal = () => {
  emit('update:isVisible', false);
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
    overflow: auto;
    height: 100%;

    &__header {
      @include d-flex(space-between, center);
      padding: $space-xl $space-2xl;
      background-color: transparent;

      .modal {
        &__close {
          background: none;
          border: none;
          color: $color-text-secondary;
          font-size: $font-size-lg;
          cursor: pointer;
          padding: $space-xs;
          line-height: 1;
          transition: color 0.2s ease;

          &:hover {
            color: $color-text-primary;
          }
        }
      }
    }

    &__body {
      padding: $space-2xl;
      @include d-flex(flex-start, stretch, column);
      gap: $space-xl;
      background-color: transparent;
    }

    &__footer {
      @include d-flex(flex-end, center);
      gap: $space-lg;
      padding: $space-xl $space-2xl;
      background-color: transparent;
    }
  }
}
</style>
