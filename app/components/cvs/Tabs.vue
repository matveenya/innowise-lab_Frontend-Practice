<template>
  <nav class="tabs">
    <ul class="tabs__list">
      <li
        v-for="tab in tabs"
        :key="tab.name"
        class="tabs__item"
        :class="{ 'tabs__item--active': currentTab === tab.name }"
      >
        <NuxtLink :to="tab.to" class="tabs__link">
          {{ tab.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();

interface Tab {
  name: string;
  to: string;
}

const tabs: Tab[] = [
  { name: 'DETAILS', to: '/cvs/details' },
  { name: 'SKILLS', to: '/cvs/skills' },
  { name: 'PROJECTS', to: '/cvs/projects' },
  { name: 'PREVIEW', to: '/cvs/preview' },
];

const currentTab = computed<Tab['name']>(() => {
  const currentPath = route.path.toLowerCase();
  const tab = tabs.find(t => currentPath.includes(t.name.toLowerCase()));
  return tab ? tab.name : 'DETAILS';
});
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
