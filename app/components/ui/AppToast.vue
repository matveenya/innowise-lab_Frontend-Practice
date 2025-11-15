<template>
  <Toast :position="position" :pt="toastPT" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    position?:
      | 'top-right'
      | 'top-left'
      | 'bottom-left'
      | 'bottom-right'
      | 'top-center'
      | 'bottom-center'
      | 'center';
  }>(),
  {
    position: 'top-right',
  }
);

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
