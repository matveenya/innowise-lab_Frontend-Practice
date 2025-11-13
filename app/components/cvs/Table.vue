<template>
  <div class="cvs-table-container">
    <DataTable
      v-model:expanded-rows="expandedRows"
      :value="cvs"
      data-key="id"
      :pt="tablePT"
      sort-mode="single"
      sort-field="name"
      :sort-order="1"
      scrollable
      scroll-height="calc(100vh - 80px)"
    >
      <Column
        field="name"
        header="Name"
        sortable
        header-class="table-header__item"
        body-class="cv-row__cell cv-row__cell--name"
      >
        <template #sorticon="{ sortOrder }">
          <SortIcon :sort-order="sortOrder" />
        </template>
      </Column>

      <Column
        field="education"
        header="Education"
        sortable
        header-class="table-header__item"
        body-class="cv-row__cell"
      >
        <template #sorticon="{ sortOrder }">
          <SortIcon :sort-order="sortOrder" />
        </template>
      </Column>

      <Column
        field="user.email"
        header="Employee"
        sortable
        header-class="table-header__item"
        body-class="cv-row__cell"
      >
        <template #sorticon="{ sortOrder }">
          <SortIcon :sort-order="sortOrder" />
        </template>
      </Column>

      <Column
        header-class="table-header__item table-header__item--actions"
        body-class="cv-row__cell cv-row__cell--actions"
      >
        <template #body="{ data }">
          <button class="actions-button" @click="event => emit('open-menu', event, data)">
            <Icon name="mdi:dots-vertical" size="1.5em" mode="svg" />
          </button>
        </template>
      </Column>

      <template #expansion="{ data }">
        <div class="cv-description-cell">
          {{ data.description }}
        </div>
      </template>

      <template #empty>
        <div class="no-results-cell">
          <p class="no-results">No results found</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { Cv } from 'cv-graphql';
import type { DataTablePassThroughOptions } from 'primevue/datatable';

const props = defineProps<{
  cvs: Cv[] | null;
}>();

const emit = defineEmits<{
  'open-menu': [event: Event, cv: Cv];
}>();

const expandedRows = ref({});

watch(
  () => props.cvs,
  newCvs => {
    if (newCvs) {
      expandedRows.value = newCvs.reduce(
        (acc, cv) => {
          acc[cv.id] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );
    }
  },
  { immediate: true }
);

const tablePT: DataTablePassThroughOptions = {
  table: { class: 'cvs-table' },
  thead: { class: 'cvs-table__header' },
  headerRow: { class: 'cvs-table__header-row' },
  tbody: { class: 'cvs-table__body' },
  row: { class: 'cv-row' },
  rowExpansion: { class: 'cv-description-row' },
};
</script>

<style lang="scss">
.cvs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: $space-md;
}

.cvs-table__header-row {
  height: $space-4xl;
  @include border-bottom($color-border-subtle, 1px);
}

.table-header__item {
  color: $color-text-primary;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-align: left;
  padding: $space-md;
  cursor: pointer;
  user-select: none;
  position: relative;

  .p-column-header-content {
    display: inline-flex;
    align-items: center;
    gap: $space-sm;
  }

  .p-column-sort-icon {
    vertical-align: text-bottom;
  }

  &:hover {
    color: $color-text-secondary;

    .sort-icon-neutral {
      opacity: 1;
    }
  }
}

.cv-row__cell {
  padding-top: $space-lg;
  padding-bottom: $space-sm;
  padding-inline: $space-md;
  font-size: $font-size-md;
  color: $color-text-primary;
  vertical-align: top;
  background-color: transparent;
  border: none;

  &--name {
    width: 40%;
  }

  &--actions {
    text-align: right;
    width: 5%;
  }
}

.actions-button {
  background: transparent;
  color: $color-text-secondary;
  cursor: pointer;
  border-radius: $radius-full;
  padding: $space-xs;
  border: none;
  display: inline-flex;

  &:hover {
    background-color: $button-bg-disabled;
  }
}

.cv-description-row {
  @include border-bottom($color-border-subtle, 1px);
  background-color: transparent;

  & > td {
    padding: 0 $space-md $space-lg $space-md;
    border: none;
  }
}

.cv-description-cell {
  font-size: $font-size-md;
  color: $color-text-muted;
  white-space: pre-wrap;
  word-break: break-word;
}

.no-results-cell {
  padding: $space-6xl;
  text-align: center;
  width: 100%;

  .no-results {
    color: $color-text-primary;
    font-size: $font-size-2xl;
    font-weight: $font-weight-medium;
  }
}
</style>
