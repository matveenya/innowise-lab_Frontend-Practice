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
              <button class="actions-button" @click="event => toggleMenu(event, cv)">
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

    <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" class="cv-actions-menu">
      <template #item="{ item }">
        <button
          class="cv-actions-menu__item"
          @click="e => item.command && item.command({ originalEvent: e, item })"
        >
          <span>{{ item.label }}</span>
        </button>
      </template>
    </Menu>

    <ModalsCvCreateModal v-model:is-visible="isDialogVisible" @cv-created="refetchCvs" />

    <ModalsBaseModal
      :is-visible="isDeleteModalVisible"
      @update:is-visible="isDeleteModalVisible = $event"
    >
      <template #header>
        <h3 class="modal-title">Delete CV</h3>
      </template>
      <template #body>
        <p class="delete-confirmation-text">
          Are you sure you want to delete CV
          <span class="highlight-text">{{ selectedCv?.name }}</span
          >?
        </p>
      </template>
      <template #footer>
        <button class="button button--cancel" @click="isDeleteModalVisible = false">CANCEL</button>
        <button class="button button--confirm" @click="handleDeleteCv">CONFIRM</button>
      </template>
    </ModalsBaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCvs as getCvsService, deleteCv as deleteCvService } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { Cv } from 'cv-graphql';
import Menu from 'primevue/menu';

definePageMeta({
  middleware: 'auth',
});

const isDialogVisible = ref(false);
const isDeleteModalVisible = ref(false);
const searchTerm = ref('');
const selectedCv = ref<Cv | null>(null);
const menu = ref();

const { data: cvs, refetch: refetchCvs } = createQueryAdapter(getCvsService);

const menuItems = ref([
  {
    label: 'Details',
    command: () => {
      if (selectedCv.value) {
        navigateTo({ path: '/cvs/details', query: { id: selectedCv.value.id } });
      }
    },
  },
  {
    label: 'Delete CV',
    command: () => {
      isDeleteModalVisible.value = true;
    },
  },
]);

const toggleMenu = (event: Event, cv: Cv) => {
  selectedCv.value = cv;
  menu.value.toggle(event);
};

const handleDeleteCv = async () => {
  if (!selectedCv.value) return;

  try {
    await deleteCvService(selectedCv.value.id);
    await refetchCvs();
    isDeleteModalVisible.value = false;
    selectedCv.value = null;
  } catch (err) {
    console.error('Error deleting CV:', err);
  }
};
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

.modal-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin: 0;
}

.delete-confirmation-text {
  font-size: $font-size-md;
  color: $color-text-secondary;
  line-height: 1.5;

  .highlight-text {
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}

.button {
  padding: $space-md $space-6xl;
  border-radius: $radius-2xl;
  font-weight: $font-weight-bold;
  cursor: pointer;
  font-size: $font-size-sm;
  text-transform: uppercase;
  border: none;
  min-width: 120px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &--cancel {
    background-color: transparent;
    color: $color-text-muted;
    border: $border-outline;

    &:hover {
      background-color: $button-outline-hover;
      color: $color-text-primary;
      border-color: $color-text-primary;
    }
  }

  &--confirm {
    background-color: $color-secondary;
    color: $color-text-primary;

    &:hover {
      background-color: $color-secondary-hover;
    }
  }
}
</style>

<style lang="scss">
.cv-actions-menu {
  position: absolute;
  min-width: $sidebar-width-open / 2;
  background-color: $color-bg-action-cv;
  box-shadow: $shadow-md;
  border-radius: $radius-sm;
  overflow: hidden;
  padding: $space-xs 0;

  &__item {
    @include d-flex(flex-start, center);
    gap: $space-md;
    width: 100%;
    padding: $space-md $space-lg;
    color: $color-text-primary;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: $button-bg-disabled;
    }

    svg {
      flex-shrink: 0;
    }
  }
}
</style>
