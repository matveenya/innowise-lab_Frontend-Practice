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

      <tbody v-if="cvs && cvs.length > 0">
        <template v-for="cv in cvs" :key="cv.id">
          <tr class="cv-row">
            <td class="cv-row__cell cv-row__cell--name">
              {{ cv.name }}
            </td>
            <td class="cv-row__cell">{{ cv.education }}</td>
            <td class="cv-row__cell">{{ cv.user?.email }}</td>
            <td class="cv-row__cell cv-row__cell--actions">
              <button class="actions-button">
                <Icon name="mdi:dots-horizontal" size="1.5em" mode="svg" />
              </button>
            </td>
          </tr>
          <tr class="cv-description-row">
            <td colspan="4" class="cv-description-cell">
              {{ cv.description }}
            </td>
          </tr>
        </template>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="4" class="no-results-cell">
            <p class="no-results">No results found</p>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalsCvCreateModal v-model:is-visible="isDialogVisible" @cv-created="refetchCvs" />
  </section>
</template>

<script setup lang="ts">
import { getCvs as getCvsService } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';

definePageMeta({
  middleware: 'auth',
});

const isDialogVisible = ref(false);
const searchTerm = ref('');

const { data: cvs, refetch: refetchCvs } = createQueryAdapter(getCvsService);
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

      &--actions {
        width: 5%;
      }
    }
  }

  .cv-row {
    &__cell {
      padding-top: $space-lg;
      padding-bottom: $space-sm;
      font-size: $font-size-md;
      color: $color-text-primary;
      vertical-align: top;

      &--name {
        width: 40%;
      }

      &--actions {
        text-align: right;

        .actions-button {
          background: transparent;
          color: $color-text-secondary;
          cursor: pointer;
          border-radius: $radius-full;
          padding: $space-xs;
          &:hover {
            background-color: $button-bg-disabled;
          }
        }
      }
    }
  }

  .cv-description-row {
    @include border-bottom($color-border-subtle, 1px);
  }

  .cv-description-cell {
    padding-bottom: $space-lg;
    font-size: $font-size-sm;
    color: $color-text-muted;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .no-results-cell {
    padding-top: $space-6xl;
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
