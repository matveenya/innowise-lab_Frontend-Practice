<template>
  <section class="cvs-page">
    <h2 class="page-title-small">CVs</h2>

    <div class="cvs-page__controls-and-button">
      <SearchInput v-model="searchTerm" placeholder="Search" />
      <Button variant="ghost-secondary" class="create-button" @click="isDialogVisible = true">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        CREATE CV
      </Button>
    </div>

    <CvsTable
      :data="filteredCvs"
      :columns="columns"
      sort-field="name"
      @reset-search="searchTerm = ''"
    >
      <template #actions="{ data }">
        <button class="actions-button" @click="event => handleOpenMenu(event, data)">
          <Icon name="mdi:dots-vertical" size="1.5em" mode="svg" />
        </button>
      </template>
    </CvsTable>

    <CvsActionMenu
      ref="actionsMenu"
      @details="handleDetails"
      @delete="isDeleteModalVisible = true"
    />

    <ModalsCvCreateModal v-model:is-visible="isDialogVisible" @cv-created="refetchCvs" />

    <ModalsCvDeleteModal
      v-model:is-visible="isDeleteModalVisible"
      :cv-id="selectedCv?.id"
      :cv-name="selectedCv?.name"
      @cv-deleted="refetchCvs"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getCvs as getCvsService } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { Cv } from 'cv-graphql';
import CvsActionMenu from '~/components/cvs/ActionMenu.vue';
import Button from '~/components/ui/Button.vue';
import { CVS_TABLE_COLUMNS } from '~/constants/cvs';

definePageMeta({
  middleware: 'auth',
});

const isDialogVisible = ref(false);
const isDeleteModalVisible = ref(false);
const searchTerm = ref('');
const selectedCv = ref<Cv | null>(null);
const actionsMenu = ref<InstanceType<typeof CvsActionMenu> | null>(null);

const { data: cvs, refetch: refetchCvs } = createQueryAdapter(getCvsService);

const columns = CVS_TABLE_COLUMNS;

const filteredCvs = computed<Cv[] | null>(() => {
  if (!cvs.value) return null;

  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return cvs.value;

  return cvs.value.filter(cv => cv.name.toLowerCase().includes(term));
});

const handleOpenMenu = (event: Event, cv: Cv) => {
  selectedCv.value = cv;
  actionsMenu.value?.toggle(event);
};

const handleDetails = () => {
  if (selectedCv.value) {
    navigateTo({ path: '/cvs/details', query: { id: selectedCv.value.id } });
  }
};
</script>

<style lang="scss">
.cvs-page {
  padding-left: $space-2xl;
  padding-top: $space-lg;
  height: 100%;
  @include d-flex(flex-start, stretch, column);

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
    margin-right: $space-2xl;

    .create-button {
      padding: $space-lg $space-6xl;
      border-radius: $radius-2xl;
    }
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
</style>
