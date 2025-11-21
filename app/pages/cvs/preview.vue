<template>
  <main v-if="cv" class="cv-preview-page">
    <PreviewHeader :user="cv.user" />

    <section class="cv-preview-page__main-info">
      <PreviewInfoSide :education="cv.education" :domains="projectDomains" />

      <section class="description-section">
        <h3 class="description-title">{{ cv.name }}</h3>
        <p class="description-text">
          {{ cv.description }}
        </p>
      </section>
    </section>

    <section class="cv-preview-page__projects">
      <h2 class="section-title">Projects</h2>

      <div class="projects-list">
        <PreviewProjectCard
          v-for="project in cv.projects"
          :key="project.id"
          :project="project"
          :user-position="userPosition"
        />
      </div>
    </section>
  </main>
  <div v-else-if="loading" class="loading-state">Loading...</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCv } from '~/composables/useCv';
import PreviewHeader from '~/components/cvs/PreviewHeader.vue';
import PreviewInfoSide from '~/components/cvs/PreviewInfoSide.vue';
import PreviewProjectCard from '~/components/cvs/PreviewProjectCard.vue';

definePageMeta({
  layout: 'cv-details',
});

const { cv, loading } = useCv();

type UserWithPosition = {
  position_name?: string;
};

const userPosition = computed(() => {
  const user = cv.value?.user as unknown as UserWithPosition | undefined;
  return user?.position_name;
});

const projectDomains = computed(() => {
  const projects = cv.value?.projects || [];
  const domains = projects
    .map(p => p.domain)
    .filter((d): d is string => !!d && d.trim().length > 0);

  return [...new Set(domains)].join(', ');
});
</script>

<style lang="scss" scoped>
.cv-preview-page {
  max-width: $cv-details-width;
  width: 100%;
  margin-inline: auto;
  padding-bottom: $space-6xl;
  color: $color-text-primary;

  &__main-info {
    @include grid-layout($sidebar-width-open 1fr, auto, $space-4xl);
    margin-bottom: $space-6xl;
  }

  .description-section {
    padding-left: $space-2xl;
    border-left: $border-thin-1 $color-secondary;

    .description-title {
      font-size: $font-size-md;
      font-weight: $font-weight-bold;
      margin-bottom: $space-lg;
      color: $color-text-primary;
    }

    .description-text {
      font-size: $font-size-md;
      line-height: 1.6;
      color: $color-text-primary;
      white-space: pre-line;
      margin-bottom: $space-lg;
    }
  }

  &__projects {
    .section-title {
      font-size: $font-size-4xl;
      font-weight: $font-weight-regular;
      margin-bottom: $space-3xl;
      color: $color-text-primary;
    }
  }
}

.loading-state {
  padding: $space-2xl;
  text-align: center;
  color: $color-text-secondary;
}
</style>
