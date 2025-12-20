<template>
  <nav class="breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="breadcrumb__separator">›</span>

      <NuxtLink v-if="item.to" :to="item.to" :class="item.class || 'breadcrumb__link'">
        <Icon
          v-if="item.icon"
          :name="item.icon"
          mode="svg"
          size="1.3rem"
          style="vertical-align: text-bottom"
        />
        {{ item.label }}
      </NuxtLink>

      <span v-else :class="item.class || 'breadcrumb__active'">
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

export interface BreadcrumbItem {
  label: string;
  to?: RouteLocationRaw;
  class?: string;
  icon?: string;
}

defineProps<{
  items: BreadcrumbItem[];
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

  &__highlight {
    font-weight: $font-weight-medium;
    text-decoration: none;
    transition: color 0.2s ease;

    &--link {
      color: $color-secondary;

      &:hover {
        text-decoration: underline;
      }
    }

    &--static {
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
