<template>
  <table class="cvs-table">
    <thead>
      <tr class="cvs-table__header-row">
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
            <button class="actions-button" @click="event => emit('open-menu', event, cv)">
              <Icon name="mdi:dots-vertical" size="1.5em" mode="svg" />
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
</template>

<script setup lang="ts">
import type { Cv } from 'cv-graphql';

defineProps<{
  cvs: Cv[] | null;
}>();

const emit = defineEmits<{
  'open-menu': [event: Event, cv: Cv];
}>();
</script>

<style scoped lang="scss">
.cvs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: $space-md;

  thead {
    @include border-bottom($color-border-subtle, 1px);
  }

  &__header-row {
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
</style>
