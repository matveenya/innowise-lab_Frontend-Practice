<template>
  <main class="cvs-projects">
    <nav class="breadcrumb">
      <NuxtLink to="/cvs" class="breadcrumb__link">CVs</NuxtLink>
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__current">Cv Name</span>
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__active">Projects</span>
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

    <div class="cvs-projects__controls-and-button">
      <div class="search-input-wrapper">
        <Icon name="ic:baseline-search" size="1.5em" mode="svg" class="search-icon" />
        <input type="text" placeholder="Search" class="search-input" />
      </div>
      <button class="create-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD PROJECT
      </button>
    </div>

    <table class="cvs-projects__table">
      <thead>
        <tr class="cvs-projects__table-header-row">
          <th class="table-header__item sortable">
            Name
            <Icon name="ic:baseline-arrow-upward" size="1em" mode="svg" />
          </th>
          <th class="table-header__item">Education</th>
          <th class="table-header__item">Employee</th>
          <th class="table-header__item table-header__item--actions"></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colspan="4" class="no-results-cell">
            <p class="no-results">No results found</p>
          </td>
        </tr>
      </tbody>
    </table>
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
.cvs-projects {
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

  &__controls-and-button {
    @include d-flex(space-between, center);
    margin-bottom: $space-3xl;

    .search-input-wrapper {
      position: relative;
      width: $input-width-cvs;

      .search-input {
        width: 100%;
        padding: $space-md $space-lg $space-md $space-4xl;
        border-radius: $radius-2xl;
        border: $border-outline;
        background-color: $color-primary;
        color: $color-text-primary;
        font-size: $font-size-md;
        box-shadow: none;

        &:focus {
          outline: none;
          border: $border-outline-active;
        }

        &::placeholder {
          color: $color-text-muted;
        }
      }

      .search-icon {
        position: absolute;
        left: $space-md;
        top: 50%;
        transform: translateY(-50%);
        color: $color-text-primary;
      }
    }

    .create-button {
      @include d-flex(center, center);
      gap: $space-xs;
      background-color: transparent;
      color: $color-secondary;
      text-transform: uppercase;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      cursor: pointer;
      padding: $space-lg $space-6xl;
      border-radius: $radius-2xl;

      &:hover {
        background-color: rgba($color-secondary, 0.1);
      }
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: $space-md;

    thead {
      @include border-bottom($color-border-subtle, 1px);
    }

    .cvs-page__table-header-row {
      height: $space-4xl;
    }

    .table-header__item {
      color: $color-text-primary;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      text-align: left;
      padding-bottom: $space-md;

      &.sortable {
        @include d-flex(flex-start, center);
        gap: $space-2xs;
        color: $color-text-primary;
        cursor: pointer;

        svg {
          color: $color-text-primary;
        }
      }
    }
  }

  .no-results-cell {
    padding-top: $space-3xl;
    text-align: center;

    .no-results {
      text-align: center;
      color: $color-text-primary;
      font-size: $font-size-2xl;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
