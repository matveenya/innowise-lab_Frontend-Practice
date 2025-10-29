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
  margin-bottom: $space-6xl;

  &__link {
    padding: $space-sm $space-lg;
    margin-right: $space-2xl;
    color: $color-text-muted;
    text-transform: uppercase;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      color: $color-secondary;
    }

    &.router-link-exact-active {
      color: $color-secondary;
      border-bottom: 2px solid $color-secondary;
    }
  }
}
</style>
