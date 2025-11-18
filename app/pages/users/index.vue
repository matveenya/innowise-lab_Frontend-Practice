<template>
  <div class="users-page">
    <div class="users-page__breadcrumb"><BaseBreadcrumb :items="breadcrumbItems" /></div>
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
          <div class="action-icon-container">
            <ActionIcon
              :icon-name="renderActionIconName(data)"
              :is-current-user="data.id === currentUserId"
              @click="event => handleIconClick(event, data)"
            />
          </div>
          <Menu ref="menu" :model="menuItems" :popup="true" :pt="menuPT" />
        </template>
      </Column>

      <template v-if="!pending" #empty>
        <NoSearchResult @reset-search="resetSearch" />
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import ActionIcon from '~/components/ui/ActionIcon.vue';
import type { User } from '~/graphql/types/user';
import type { BreadcrumbItem } from '~/components/ui/BaseBreadcrumb.vue';
import { useAuthStore } from '~/stores/auth';
import { USERS_TABLE_COLUMNS } from '~/constants/users';
import { refDebounced } from '@vueuse/core';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';

definePageMeta({
  middleware: 'auth',
});

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [{ label: 'Employees' }]);

const searchInput = ref('');
const searchQuery = refDebounced(searchInput, 300);
const sortField = ref('department_name');
const sortOrder = ref(1);
const columns = USERS_TABLE_COLUMNS;

const auth = useAuthStore();
const currentUserId = computed(() => auth.user?.id);
const isAdmin = computed(() => auth.user?.role === 'Admin');
const selectedUser = ref<User | null>(null);

const menu = ref<InstanceType<typeof Menu> | null>(null);

const menuItems = computed(() => {
  if (!selectedUser.value) return [];

  const items = [
    {
      label: 'Profile',
      command: () => {
        navigateTo(`/users/${selectedUser.value!.id}`);
      },
    },
    {
      label: 'Update user',
      command: () => {
        alert('Update');
      },
    },
  ];

  if (isAdmin.value) {
    items.push({
      label: 'Delete user',
      command: () => {
        alert('Delete');
      },
    });
  }

  return items;
});

const { users, pending } = await useUsersTable();

const renderActionIconName = (userData: User): string => {
  return userData.id === currentUserId.value
    ? 'material-symbols:more-vert'
    : 'ic:baseline-keyboard-arrow-right';
};

const handleIconClick = (event: Event, userData: User) => {
  if (userData.id !== currentUserId.value) {
    navigateTo(`/users/${userData.id}`);
    return;
  }

  selectedUser.value = userData;
  menu.value?.toggle(event, event.currentTarget as HTMLElement);
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

const menuPT = ref({
  root: { class: 'menu' },
  itemLink: { class: 'menu__link' },
});
</script>

<style lang="scss">
.users-page {
  padding-left: $space-2xl;
  &__breadcrumb {
    padding-top: $space-lg;
  }

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

td:has(.no-results) {
  border-bottom: none;
}

.action-icon-container {
  position: relative;
}

.menu {
  position: absolute;
  background-color: $color-primary;
  box-shadow: $shadow-md;
  border-radius: $radius-sm;
  overflow: hidden;
  &__link {
    @include d-flex(flex-start, center);
    gap: $space-md;
    width: 100%;
    padding: $space-md $space-xl;
    color: $color-text-primary;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: $button-bg-disabled;
    }
  }
}
</style>
