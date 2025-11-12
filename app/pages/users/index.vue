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
          <button
            class="icon-button"
            :class="{ 'is-current-user': data.id === currentUserId }"
            :aria-label="data.id === currentUserId ? 'Open user menu' : 'View user profile'"
            @click="handleIconClick(data)"
          >
            <ClientOnly>
              <Icon
                :name="
                  data.id === currentUserId
                    ? 'material-symbols:more-vert'
                    : 'ic:baseline-keyboard-arrow-right'
                "
                mode="svg"
                size="1.5rem"
                class="icon"
              />
            </ClientOnly>
          </button>
        </template>
      </Column>

      <template v-if="!pending" #empty>
        <div class="users-page__no-results" role="status">
          <h5 class="users-page__no-results-title">No results found</h5>
          <p class="users-page__no-results-message">
            Try another search, check the spelling or use a broader term
          </p>
          <Button variant="ghost" @click="resetSearch">Reset search</Button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from '~/components/ui/Button.vue';
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

const { users, pending } = await useUsersTable();

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
  &__no-results {
    width: 100%;
    height: calc(100vh - 165px);
    @include d-flex(center, center, column);
    gap: $space-lg;

    &-title {
      font-size: $font-size-2xl;

      line-height: 1.35;
    }
    &-message {
      font-size: $font-size-md;

      line-height: 1.5;
    }
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
    z-index: 20;
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
