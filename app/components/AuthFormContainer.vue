<template>
  <div class="auth-form-container">
    <div class="auth-form-container__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-form-container {
  @include d-flex(center, flex-start);
  width: 100%;

  &__content {
    width: 100%;
    max-width: 560px;
    background-color: $color-primary;
    padding: $space-2xl 0;
  }
}
</style>
