<template>
  <div class="auth-form-container" :class="{ 'auth-form-container--centered': isForgotPassword }">
    <div class="auth-form-container__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isForgotPassword: boolean;
}>();
</script>

<style scoped lang="scss">
.auth-form-container {
  @include d-flex(center, flex-start);
  width: 100%;
  min-height: 100vh;

  &--centered {
    @include d-flex(center, center);
  }

  &__content {
    width: 100%;
    max-width: 560px;
    background-color: $color-primary;
    padding: $space-2xl 0;
  }
}
</style>
