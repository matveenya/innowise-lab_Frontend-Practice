<template>
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
    <Column field="name" header="Name" sortable body-class="cv-row__cell cv-row__cell--name">
      <template #sorticon="{ sortOrder }">
        <SortIcon :sort-order="sortOrder" />
      </template>
    </Column>

    <Column field="education" header="Education" sortable body-class="cv-row__cell">
      <template #sorticon="{ sortOrder }">
        <SortIcon :sort-order="sortOrder" />
      </template>
    </Column>

    <Column field="user.email" header="Employee" sortable body-class="cv-row__cell">
      <template #sorticon="{ sortOrder }">
        <SortIcon :sort-order="sortOrder" />
      </template>
    </Column>

    <Column body-class="cv-row__cell cv-row__cell--actions">
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
      <NoSearchResult @reset-search="emit('reset-search')" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import type { Cv } from 'cv-graphql';
import type { DataTablePassThroughOptions } from 'primevue/datatable';

const props = defineProps<{
  cvs: Cv[] | null;
}>();

const emit = defineEmits<{
  'open-menu': [event: Event, cv: Cv];
  'reset-search': [];
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
  table: { class: 'table' },
  thead: { class: 'table__header' },
  row: { class: 'cv-row' },
  rowExpansion: { class: 'cv-description-row' },
};
</script>

<style lang="scss">
.cv-row__cell {
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
    padding: 0 $space-lg $space-lg $space-lg;
    border: none;
  }
}

.cv-description-cell {
  font-size: $font-size-md;
  color: $color-text-muted;
  white-space: pre-wrap;
  word-break: break-word;
}

.table td:has(.no-results) {
  border-bottom: none;
}
</style>
