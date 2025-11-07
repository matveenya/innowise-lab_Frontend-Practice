<template>
  <section class="cvs-page">
    <h2 class="page-title-small">CVs</h2>

    <div class="cvs-page__controls-and-button">
      <SearchInput v-model="searchTerm" placeholder="Search" />
      <button class="create-button" @click="isDialogVisible = true">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        CREATE CV
      </button>
    </div>

    <table class="cvs-page__table">
      <thead>
        <tr class="cvs-page__table-header-row">
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

    <ModalsCvCreateModal v-model:is-visible="isDialogVisible" />
  </section>
</template>

<script setup lang="ts">
const isDialogVisible = ref(false);
const searchTerm = ref('');
</script>

<style scoped lang="scss">
.cvs-page {
  padding-top: $space-lg;

  .page-title-small {
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $color-text-muted;
    text-transform: uppercase;
    margin-bottom: $space-lg;
  }

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
