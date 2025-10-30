<template>
  <div class="form-action-wrapper">
    <button type="submit" class="auth-button auth-button--primary">
      <slot name="button-text"></slot>
    </button>

    <NuxtLink :to="linkTo" class="auth-link auth-link--muted">
      <slot name="link-text"></slot>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  linkTo: string;
}>();
</script>

<style scoped lang="scss">
.form-action-wrapper {
  @include d-flex(center, center, column);
  width: 100%;
}

.auth-button {
  width: 220px;
  padding: $space-md $space-lg;
  border-radius: $radius-2xl;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: $font-weight-medium;
  transition: background-color 0.2s ease;
  margin-top: $space-xl;

  &--primary {
    background-color: $button-primary-bg;
    color: $button-primary-text;

    &:hover {
      background-color: $button-primary-hover;
    }
  }
}

.auth-link {
  font-size: $font-size-sm;
  text-transform: uppercase;
  margin-top: $space-xl;
  text-align: center;
  text-decoration: none;

  &--muted {
    color: $color-text-muted;

    &:hover {
      color: $color-text-secondary;
    }
  }
}
</style>
