<template>
  <nav class="breadcrumb">
    <NuxtLink to="/cvs" class="breadcrumb__link">CVs</NuxtLink>
    <span class="breadcrumb__separator">›</span>

    <NuxtLink
      v-if="cvId"
      :to="{ path: '/cvs/details', query: { id: cvId } }"
      class="breadcrumb__cv-name"
      :class="{
        'breadcrumb__cv-name--details': !activePage,
        'breadcrumb__cv-name--link': activePage,
      }"
    >
      {{ cvName }}
    </NuxtLink>

    <template v-if="activePage">
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__active">{{ activePage }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  activePage?: string;
  cvName?: string;
  cvId?: string;
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
    transition: color 0.2s ease;

    &:hover {
      color: $color-text-primary;
      text-decoration: underline;
    }
  }

  &__cv-name {
    font-weight: $font-weight-medium;
    text-decoration: none;
    transition: color 0.2s ease;

    &--link {
      color: $color-secondary;

      &:hover {
        text-decoration: underline;
      }
    }

    &--details {
      color: $color-secondary-hover;
      pointer-events: none;
    }
  }

  &__separator {
    color: $color-text-muted;
    font-size: $font-size-2xl;
    line-height: 1;
  }

  &__active {
    color: $color-text-primary-disabled;
    font-weight: $font-weight-regular;
  }
}
</style>
