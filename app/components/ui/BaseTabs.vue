<template>
  <nav class="tabs">
    <ul class="tabs__list">
      <NuxtLink
        v-for="tab in items"
        :key="tab.label"
        v-slot="{ href, navigate, isActive }"
        :to="tab.to"
        custom
      >
        <li class="tabs__item" :class="{ 'tabs__item--active': isActive }">
          <a :href="href" class="tabs__link" @click="navigate">
            {{ tab.label }}
          </a>
        </li>
      </NuxtLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

export interface TabItem {
  label: string;
  to: RouteLocationRaw;
}

defineProps<{
  items: TabItem[];
}>();
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: $space-2xl;
  font-size: $font-size-sm;

  &__list {
    @include d-flex(flex-start, center);
    gap: $space-lg;
  }

  &__item {
    &--active .tabs__link {
      color: $color-secondary;
      @include border-bottom($color-secondary);
    }
  }

  &__link {
    display: inline-block;
    padding: $space-lg $space-4xl;
    text-transform: uppercase;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    @include border-bottom(transparent);
    transition: all 0.3s ease;

    &:active {
      background-color: rgba($color-secondary, 0.1);
    }
  }
}
</style>
