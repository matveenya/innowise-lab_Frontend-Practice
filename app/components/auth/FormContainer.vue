<template>
  <div class="auth-form-container" :class="{ 'auth-form-container--centered': isCentered }">
    <div v-if="$slots.header" class="auth-form-container__header">
      <slot name="header" />
    </div>

    <div class="auth-form-container__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCentered: boolean;
}>();
</script>

<style scoped lang="scss">
.auth-form-container {
  @include d-flex(flex-start, center, column);
  width: 100%;
  min-height: 100vh;

  &--centered {
    @include d-flex(center, center, column);
  }

  &__header {
    width: 100%;
  }

  &__content {
    width: 100%;
    max-width: 560px;
    background-color: $color-primary;
    padding: $space-2xl 0;
    margin-block: auto;
  }
}
</style>
