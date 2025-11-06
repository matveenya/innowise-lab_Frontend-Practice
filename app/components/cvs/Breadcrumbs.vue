<template>
  <nav class="breadcrumb">
    <NuxtLink to="/cvs" class="breadcrumb__link">CVs</NuxtLink>
    <span class="breadcrumb__separator">›</span>
    <span class="breadcrumb__current">Cv Name</span>
    <template v-if="activePage">
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__active">{{ activePage }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  activePage?: string;
}>();
</script>

<style lang="scss" scoped>
.breadcrumb {
  @include d-flex(flex-start, center);
  gap: $space-md;
  margin-bottom: $space-xs;
  font-size: $font-size-md;
  color: $color-text-muted;

  &__link {
    color: $color-text-secondary;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__separator {
    color: $color-text-muted;
    font-size: $font-size-2xl;
  }

  &__current {
    color: $color-secondary;
    font-weight: $font-weight-medium;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
