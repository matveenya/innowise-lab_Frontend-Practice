<template>
  <div class="auth-tabs">
    <NuxtLink to="/auth/login" class="auth-tabs__link">LOG IN</NuxtLink>
    <NuxtLink to="/auth/signup" class="auth-tabs__link">SIGN UP</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.auth-tabs {
  @include d-flex(center, flex-start);
  width: 100%;

  &__link {
    padding: $space-xl $space-5xl;

    color: $color-text-muted;
    text-transform: uppercase;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    @include border-bottom(transparent);
    transition: all 0.2s ease;

    &:hover {
      color: $color-secondary;
    }

    &.router-link-exact-active {
      color: $color-secondary;
      @include border-bottom($color-secondary);
    }
  }
}
</style>
