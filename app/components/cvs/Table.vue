<template>
  <table class="cvs-table">
    <thead>
      <tr class="cvs-table__header-row">
        <th class="table-header__item sortable" @click="emit('sort', 'name')">
          <div class="th-content">
            <span>Name</span>
            <Icon
              name="ic:baseline-arrow-upward"
              size="1em"
              mode="svg"
              class="sort-icon"
              :class="{
                'sort-icon--rotated': sortColumn === 'name' && sortDirection === 'desc',
                'sort-icon--hidden': sortColumn !== 'name',
              }"
            />
          </div>
        </th>

        <th class="table-header__item sortable" @click="emit('sort', 'education')">
          <div class="th-content">
            <span>Education</span>
            <Icon
              v-if="sortColumn === 'education'"
              name="ic:baseline-arrow-upward"
              size="1em"
              mode="svg"
              class="sort-icon"
              :class="{ 'sort-icon--rotated': sortDirection === 'desc' }"
            />
          </div>
        </th>

        <th class="table-header__item sortable" @click="emit('sort', 'user.email')">
          <div class="th-content">
            <span>Employee</span>
            <Icon
              v-if="sortColumn === 'user.email'"
              name="ic:baseline-arrow-upward"
              size="1em"
              mode="svg"
              class="sort-icon"
              :class="{ 'sort-icon--rotated': sortDirection === 'desc' }"
            />
          </div>
        </th>

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
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}>();

const emit = defineEmits<{
  'open-menu': [event: Event, cv: Cv];
  sort: [column: string];
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
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    text-align: left;
    padding-bottom: $space-md;
    color: $color-text-primary;
    transition: color 0.2s ease;

    &.sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: $color-text-secondary;
      }
    }

    .th-content {
      @include d-flex(flex-start, center);
      gap: $space-xs;
    }

    .sort-icon {
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;

      &--rotated {
        transform: rotate(180deg);
      }

      &--hidden {
        opacity: 0;
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
        border: none;
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
