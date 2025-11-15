<template>
  <div class="form-action-wrapper">
    <Button variant="primary" type="submit" class="auth-button">
      <slot name="button-text"></slot>
    </Button>

    <NuxtLink :to="linkTo" class="auth-link auth-link--muted">
      <slot name="link-text"></slot>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
defineProps<{
  linkTo: string;
}>();
</script>

<style scoped lang="scss">
.form-action-wrapper {
  @include d-flex(center, center, column);
  width: 100%;

  .auth-button {
    margin-top: $space-xl;
    width: $button-width;
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
}
</style>
