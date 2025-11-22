<template>
  <DataTable
    v-model:expanded-rows="expandedRows"
    :value="data"
    data-key="id"
    :pt="tablePT"
    sort-mode="single"
    :sort-field="sortField"
    :sort-order="1"
    scrollable
    scroll-height="calc(100vh - 210px)"
  >
    <Column
      v-for="col in columns"
      :key="col.header"
      :field="typeof col.field === 'string' ? col.field : undefined"
      :header="col.header"
      :sortable="col.sortable"
      :body-class="col.bodyClass || 'cv-row__cell'"
      :style="col.style"
    >
      <template #sorticon="{ sortOrder }">
        <SortIcon :sort-order="sortOrder" />
      </template>

      <template #body="{ data: rowData }">
        <slot :name="col.slotName || 'default-cell'" :data="rowData" :field="col.field">
          {{ getNestedValue(rowData, col.field) }}
        </slot>
      </template>
    </Column>

    <Column v-if="$slots.actions" body-class="cv-row__cell cv-row__cell--actions">
      <template #header>&nbsp;</template>
      <template #body="{ data: rowData }">
        <slot name="actions" :data="rowData" />
      </template>
    </Column>

    <template #expansion="{ data: rowData }">
      <div class="cv-description-cell">
        <slot name="expansion" :data="rowData">
          {{ rowData.description }}
        </slot>
      </div>
    </template>

    <template #empty>
      <NoSearchResult @reset-search="$emit('reset-search')" />
    </template>
  </DataTable>
</template>

<script setup lang="ts" generic="TData extends { id: string }">
import { ref, watch } from 'vue';
import type { DataTablePassThroughOptions } from 'primevue/datatable';

export interface ColumnDef<T> {
  header: string;
  /* eslint-disable no-unused-vars */
  field?: string | ((item: T) => string | number | null | undefined);
  /* eslint-enable no-unused-vars */
  sortable?: boolean;
  bodyClass?: string;
  style?: string | object;
  slotName?: string;
}

const props = withDefaults(
  defineProps<{
    data: TData[] | null;
    columns: ColumnDef<TData>[];
    sortField?: string;
  }>(),
  {
    sortField: 'name',
  }
);

defineEmits<{
  'reset-search': [];
}>();

const expandedRows = ref<Record<string, boolean>>({});

const getNestedValue = (
  obj: TData,
  field: ColumnDef<TData>['field']
): string | number | null | undefined => {
  if (!field) return '';

  if (typeof field === 'function') {
    return field(obj);
  }

  if (typeof field === 'string') {
    const result = field.split('.').reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);

    if (
      typeof result === 'string' ||
      typeof result === 'number' ||
      result === null ||
      result === undefined
    ) {
      return result;
    }
    return String(result);
  }

  return '';
};

watch(
  () => props.data,
  newData => {
    if (newData) {
      expandedRows.value = newData.reduce(
        (acc, item) => {
          acc[item.id] = true;
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
.table {
  width: 97%;
}

.cv-row__cell {
  border: none;
  vertical-align: top;
  padding-top: $space-lg;
  color: $color-text-primary;
}

.cv-row__cell--actions {
  text-align: right;
  width: 5%;
}

.cv-description-row {
  & > td {
    padding: 0 $space-lg $space-lg $space-lg;
    @include border-bottom($color-border-table, 1px);
    background-color: transparent;
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

.actions-button {
  background: transparent;
  color: $color-text-secondary;
  cursor: pointer;
  border-radius: $radius-full;
  padding: $space-xs;
  border: none;
  display: inline-flex;
  transition: background-color 0.2s;

  &:hover {
    background-color: $button-bg-disabled;
    color: $color-text-primary;
  }
}
</style>
