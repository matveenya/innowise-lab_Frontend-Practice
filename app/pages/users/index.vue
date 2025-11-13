<template>
  <div class="users-page">
    <div class="users-page__sticky-bar">
      <SearchInput v-model="searchInput" />
    </div>

    <DataTable
      v-model:sort-field="sortField"
      v-model:sort-order="sortOrder"
      :value="filteredUsers"
      :pt="tablePT"
      sort-mode="single"
      scrollable
      scroll-height="calc(100vh - 80px)"
      role="table"
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
          <ActionIcon
            :icon-name="renderActionIconName(data)"
            :is-current-user="data.id === currentUserId"
            :aria-label="data.id === currentUserId ? 'Open user menu' : 'View user profile'"
            @click="handleIconClick(data)"
          />
        </template>
      </Column>

      <template v-if="!pending" #empty>
        <NoSearchResult @reset-search="resetSearch" />
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ActionIcon from '~/components/ui/ActionIcon.vue';
import type { User } from '~/graphql/types/user';
import { useAuthStore } from '~/stores/auth';
import { USERS_TABLE_COLUMNS } from '~/constants/users';
import { refDebounced } from '@vueuse/core';

definePageMeta({
  middleware: 'auth',
});

const searchInput = ref('');
const searchQuery = refDebounced(searchInput, 300);
const sortField = ref('department_name');
const sortOrder = ref(1);
const columns = USERS_TABLE_COLUMNS;

const auth = useAuthStore();
const currentUserId = computed(() => auth.user?.id);

const { users, pending } = await useUsersTable();

const renderActionIconName = (userData: User): string => {
  return userData.id === currentUserId.value
    ? 'material-symbols:more-vert'
    : 'ic:baseline-keyboard-arrow-right';
};

const handleIconClick = (userData: User) => {
  if (userData.id === currentUserId.value) {
    alert('Open user menu');
  } else {
    alert('View user profile');
  }
};

const resetSearch = () => {
  searchInput.value = '';
};

const filteredUsers = computed<User[]>(() => {
  if (!users.value) return [];

  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return users.value ?? [];

  return (users.value ?? []).filter(user => {
    const firstName = (user.profile?.first_name ?? '').toLowerCase();
    const lastName = (user.profile?.last_name ?? '').toLowerCase();
    const email = (user.email ?? '').toLowerCase();
    return firstName.includes(query) || lastName.includes(query) || email.includes(query);
  });
});

const tablePT = {
  table: { class: 'table' },
  thead: { class: 'table__header' },
};
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

.table th,
td {
  border-bottom: $border-thin-1 $color-border-table;
}
</style>
