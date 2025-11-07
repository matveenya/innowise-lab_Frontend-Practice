<template>
  <NuxtLayout name="default">
    <div class="cv-details-layout">
      <CvsBreadcrumbs :active-page="activePage" />
      <CvsTabs />
      <main class="cv-details-layout__content">
        <slot />
      </main>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();

const activePage = computed(() => {
  const segments = route.path.split('/').filter(s => s.length > 0);

  if (segments[0] !== 'cvs' || !segments[1]) return;

  const pageSegment = segments[1];
  const page = pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1);

  if (page === 'Details') return;

  return page;
});
</script>

<style scoped lang="scss">
.cv-details-layout {
  background-color: $color-primary;
  color: $color-text-primary;
  padding-top: $space-lg;
}
</style>
