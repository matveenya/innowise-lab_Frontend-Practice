<template>
  <main class="cv-skills">
    <nav class="breadcrumb">
      <NuxtLink to="/cvs" class="breadcrumb__link">CVs</NuxtLink>
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__current">Cv Name</span>
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__active">Skills</span>
    </nav>

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

    <div class="cv-skills__button-container">
      <button class="add-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD SKILL
      </button>
    </div>

    <div class="cv-skills__content"></div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const tabs = [
  { name: 'DETAILS', to: '/cvs/details' },
  { name: 'SKILLS', to: '/cvs/skills' },
  { name: 'PROJECTS', to: '/cvs/projects' },
  { name: 'PREVIEW', to: '/cvs/preview' },
];

const currentTab = computed(() => {
  const currentPath = route.path.toLowerCase();
  const tab = tabs.find(t => currentPath.includes(t.name.toLowerCase()));
  return tab ? tab.name : 'DETAILS';
});
</script>

<style lang="scss" scoped>
.cv-skills {
  background-color: $color-primary;
  color: $color-text-primary;
  padding: $space-lg;

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
    }
  }

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

  &__button-container {
    @include d-flex(center, center);
    width: 100%;
    margin-bottom: $space-4xl;

    .add-button {
      @include d-flex(center, center);
      width: 100%;
      gap: $space-xs;
      background-color: transparent;
      color: $color-text-muted;
      text-transform: uppercase;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      cursor: pointer;
      padding: $space-lg;
      border-radius: $radius-2xl;
      transition: background 0.2s ease;

      &:hover {
        background-color: rgba($color-text-muted, 0.1);
      }
    }
  }

  &__content {
    min-height: 50vh;
    width: 100%;
  }
}
</style>
