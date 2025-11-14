<template>
  <div class="cvs-projects">
    <div class="cvs-projects__controls-and-button">
      <SearchInput v-model="searchTerm" placeholder="Search" />
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
          <th class="table-header__item">Domain</th>
          <th class="table-header__item">Start Date</th>
          <th class="table-header__item">End Date</th>
          <th class="table-header__item table-header__item--actions"></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colspan="5" class="no-results-cell">
            <p class="no-results">No results found</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cv-details',
});

const searchTerm = ref('');
</script>

<style lang="scss" scoped>
.cvs-projects {
  &__controls-and-button {
    @include d-flex(space-between, center);
    margin-bottom: $space-3xl;

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
      margin-right: $space-2xl;

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

    .cvs-projects__table-header-row {
      height: $space-4xl;
    }

    .table-header__item {
      color: $color-text-primary;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      text-align: left;
      padding-bottom: $space-md;
      cursor: pointer;

      &:hover {
        color: $color-text-primary-disabled;
      }

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
