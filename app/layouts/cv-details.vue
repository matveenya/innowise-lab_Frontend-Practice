<template>
  <NuxtLayout name="default">
    <div class="cv-details-layout">
      <BaseBreadcrumb :items="breadcrumbItems" />
      <BaseTabs :items="tabItems" />

      <main class="cv-details-layout__content">
        <slot />
      </main>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getCvs } from '~/services/cvs';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import type { BreadcrumbItem } from '~/components/ui/BaseBreadcrumb.vue';
import type { TabItem } from '~/components/ui/BaseTabs.vue';

definePageMeta({
  layout: false,
});

const route = useRoute();
const { data: cvs } = createQueryAdapter(getCvs);

const currentCv = computed(() => {
  const cvId = route.query.id;
  if (!cvs.value || !cvId) return null;
  return cvs.value.find(cv => cv.id === cvId);
});

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [{ label: 'CVs', to: '/cvs', class: 'breadcrumb__link' }];

  if (currentCv.value) {
    const segments = route.path.split('/').filter(s => s.length > 0);

    const secondSegment = segments[1];

    const pageName = secondSegment
      ? secondSegment.charAt(0).toUpperCase() + secondSegment.slice(1)
      : '';

    const isDetailsPage = pageName === 'Details' || !pageName;

    items.push({
      label: currentCv.value.name,
      to: { path: '/cvs/details', query: { id: currentCv.value.id } },
      class: isDetailsPage
        ? 'breadcrumb__highlight breadcrumb__highlight--static'
        : 'breadcrumb__highlight breadcrumb__highlight--link',
    });

    if (!isDetailsPage) {
      items.push({ label: pageName, class: 'breadcrumb__active' });
    }
  }

  return items;
});

const tabItems = computed<TabItem[]>(() => {
  const cvId = route.query.id;
  if (!cvId) return [];

  return [
    { label: 'DETAILS', to: { path: '/cvs/details', query: { id: cvId } } },
    { label: 'SKILLS', to: { path: '/cvs/skills', query: { id: cvId } } },
    { label: 'PROJECTS', to: { path: '/cvs/projects', query: { id: cvId } } },
    { label: 'PREVIEW', to: { path: '/cvs/preview', query: { id: cvId } } },
  ];
});
</script>

<style scoped lang="scss">
.cv-details-layout {
  background-color: $color-primary;
  color: $color-text-primary;
  padding-top: $space-lg;
  height: 100%;
  overflow-y: auto;
}
</style>
