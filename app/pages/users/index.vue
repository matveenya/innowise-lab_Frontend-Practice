<template>
  <div class="users-page">
    <div class="users-page__sticky-bar">
      <SearchInput v-model="searchQuery" />
    </div>

    <DataTable
      v-model:sort-field="sortField"
      v-model:sort-order="sortOrder"
      :value="users"
      :pt="tablePT"
      sort-mode="single"
      scrollable
      scroll-height="calc(100vh - 80px)"
    >
      <Column>
        <template #body="{ data }">
          <UserAvatar :data="data" />
        </template>
      </Column>
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      >
        <template #sorticon="{ sortOrder: columnSortOrder }">
          <SortIcon :sort-order="columnSortOrder" />
        </template>
      </Column>
      <Column :sortable="false">
        <template #body="{ data }">
          <button
            class="icon-button"
            :class="{ 'is-current-user': data.id === currentUserId }"
            :aria-label="data.id === currentUserId ? 'Open user menu' : 'View user profile'"
            @click="handleIconClick(data)"
          >
            <Icon
              v-if="data.id === currentUserId"
              name="material-symbols:more-vert"
              mode="svg"
              size="1.5rem"
              class="icon"
            />
            <Icon
              v-else
              name="ic:baseline-keyboard-arrow-right"
              mode="svg"
              size="1.5rem"
              class="icon"
            />
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getUsers } from '~/services/users';
import type { User } from '~/graphql/types/user';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  middleware: 'auth',
});

const searchQuery = ref('');
const sortField = ref('department_name');
const sortOrder = ref(1);

const columns = [
  { field: 'profile.first_name', header: 'First Name' },
  { field: 'profile.last_name', header: 'Last Name' },
  { field: 'email', header: 'Email' },
  { field: 'department_name', header: 'Department' },
  { field: 'position_name', header: 'Position' },
] as const;

const tablePT = {
  table: { class: 'table' },
  thead: { class: 'table__header' },
};

const auth = useAuthStore();
const currentUserId = computed(() => auth.user?.id);

const handleIconClick = (userData: User) => {
  if (userData.id === currentUserId.value) {
    alert('Open user menu');
  } else {
    alert('View user profile');
  }
};

const { data: users } = await useAsyncData('users', () => getUsers());
</script>

<style lang="scss">
.users-page {
  padding-left: $space-2xl;
  &__sticky-bar {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: $color-primary;
    padding: $space-lg 0 $space-lg $space-xl;
  }
}
.table {
  width: 100%;
  border: 0;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: $space-lg;
    font-size: $font-size-sm;
    font-weight: $font-weight-regular;
    line-height: 1.43;
    border-bottom: $border-thin-1 $color-border-table;
  }
  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    cursor: pointer;

    th {
      background: linear-gradient(to top, transparent 0%, $color-primary 50%);
      .p-column-sort-icon {
        margin-left: 0.5rem;
        vertical-align: text-bottom;
      }

      &:hover {
        color: rgba($color-text-primary, 0.7);
        .sort-icon-neutral {
          opacity: 1;
        }
      }
    }
    th.p-sorted {
      .sort-icon-neutral {
        opacity: 0 !important;
      }
    }
  }
}

.icon-button {
  background: transparent;
  padding: 0.5rem;
  margin: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .icon {
    color: $color-text-secondary;
    transition: color 0.2s ease;
  }

  &:hover .icon {
    color: $color-text-primary;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
</style>
