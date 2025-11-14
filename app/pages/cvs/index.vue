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

    <CvsTable :cvs="filteredCvs" @open-menu="handleOpenMenu" @reset-search="searchTerm = ''" />

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
import { getCvs as getCvsService } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { Cv } from 'cv-graphql';
import CvsActionMenu from '~/components/cvs/ActionMenu.vue';

definePageMeta({
  middleware: 'auth',
});

const isDialogVisible = ref(false);
const isDeleteModalVisible = ref(false);
const searchTerm = ref('');
const selectedCv = ref<Cv | null>(null);
const actionsMenu = ref<InstanceType<typeof CvsActionMenu> | null>(null);

const { data: cvs, refetch: refetchCvs } = createQueryAdapter(getCvsService);

const filteredCvs = computed(() => {
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

<style scoped lang="scss">
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
      border: none;

      &:hover {
        background-color: rgba($color-secondary, 0.1);
      }
    }
  }
}
</style>
