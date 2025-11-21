<template>
  <main v-if="cv" class="cv-preview">
    <header class="cv-preview__header">
      <div class="cv-preview__identity">
        <h1 v-if="userName" class="cv-preview__user-name">{{ userName }}</h1>
        <p v-if="userPosition" class="cv-preview__user-position">{{ userPosition }}</p>
      </div>

      <div class="cv-preview__controls">
        <div class="language-select-wrapper">
          <Select
            v-model="selectedLanguage"
            label="Language"
            :options="languages"
            class="language-select"
          />
        </div>

        <Button variant="outline" class="export-btn"> EXPORT PDF </Button>
      </div>
    </header>

    <section class="cv-preview__main-info">
      <aside class="cv-preview__sidebar">
        <section v-if="cv.education" class="info-block">
          <h3 class="info-title">Education</h3>
          <p class="info-text">{{ cv.education }}</p>
        </section>

        <section v-else class="info-block">
          <h3 class="info-title">Education</h3>
          <p class="info-text">No education</p>
        </section>

        <section class="info-block">
          <h3 class="info-title">Language proficiency</h3>
        </section>

        <section class="info-block">
          <h3 class="info-title">Domains</h3>
          <p class="info-text">{{ projectDomains }}</p>
        </section>
      </aside>

      <section class="cv-preview__description">
        <h3 class="description-title">{{ cv.name }}</h3>
        <p class="description-text">
          {{ cv.description }}
        </p>
      </section>
    </section>

    <section class="cv-preview__projects">
      <h2 class="section-title">Projects</h2>

      <div class="projects-list">
        <article v-for="project in cv.projects" :key="project.id" class="project-item">
          <div class="project-item__main">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>

          <aside class="project-item__details">
            <div class="detail-row">
              <span class="detail-label">Project roles</span>
              <span class="detail-value">{{ userPosition }}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Period</span>
              <span class="detail-value">
                {{ formatDateNumeric(project.start_date) }} –
                {{ project.end_date ? formatDateNumeric(project.end_date) : 'Till now' }}
              </span>
            </div>

            <div v-if="project.responsibilities?.length" class="detail-row">
              <span class="detail-label">Responsibilities</span>
              <ul class="responsibilities-list">
                <li v-for="(resp, idx) in project.responsibilities" :key="idx">
                  {{ resp }}
                </li>
              </ul>
            </div>

            <div class="detail-row">
              <span class="detail-label">Environment</span>
              <span class="detail-value">{{ project.environment.join(', ') }}.</span>
            </div>
          </aside>
        </article>
      </div>
    </section>
  </main>
  <div v-else-if="loading" class="loading-state">Loading...</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCv } from '~/composables/useCv';
import { formatDateNumeric } from '~/utils/dateUtils';
import Button from '~/components/ui/Button.vue';
import Select from '~/components/ui/Select.vue';

definePageMeta({
  layout: 'cv-details',
});

const { cv, loading } = useCv();

const selectedLanguage = ref('English');
const languages = ['English', 'Deutsch', 'Русский'];

const userName = computed(() => {
  const profile = cv.value?.user?.profile;
  if (profile?.first_name && profile?.last_name) {
    return `${profile.first_name} ${profile.last_name}`;
  }
  return '';
});

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
.cv-preview {
  max-width: $cv-details-width;
  width: 100%;
  margin-inline: auto;
  padding-bottom: $space-6xl;
  color: $color-text-primary;

  &__header {
    @include d-flex(space-between, center);
    margin-bottom: $space-5xl;
    padding-bottom: $space-xl;
  }

  &__identity {
    @include d-flex(flex-start, flex-start, column);
    gap: $space-xs;
  }

  &__user-name {
    font-size: $font-size-5xl;
    font-weight: $font-weight-regular;
    line-height: 1.2;
    color: $color-text-primary;
  }

  &__user-position {
    font-size: $font-size-xl;
    color: $color-text-primary;
    margin-top: $space-xs;
  }

  &__controls {
    @include d-flex(flex-end, center);
    gap: $space-xl;

    .language-select-wrapper {
      width: $button-width-sm;
    }

    .language-select {
      .select__field {
        background-color: transparent;
        border-color: $color-border-subtle;
      }
      .select__label {
        color: $color-text-primary;
      }
      .select__value {
        color: $color-text-primary;
      }
    }

    .export-btn {
      background-color: transparent;
      border: $border-thin-1 $color-secondary;
      color: $color-secondary;
      min-width: $button-width-sm;
      padding: $space-md;

      &:hover {
        background-color: rgba($color-secondary, 0.1);
        --border-color: #{$color-secondary};
      }
    }
  }

  &__main-info {
    @include grid-layout($sidebar-width-open 1fr, auto, $space-4xl);
    margin-bottom: $space-6xl;
  }

  &__sidebar {
    .info-block {
      margin-bottom: $space-2xl;

      .info-title {
        font-size: $font-size-md;
        font-weight: $font-weight-bold;
        margin-bottom: $space-xs;
        color: $color-text-primary;
      }
    }
  }

  &__description {
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

  .project-item {
    @include grid-layout($sidebar-width-open 1fr, auto, $space-4xl);
    margin-bottom: $space-4xl;

    &__main {
      .project-name {
        font-size: $font-size-md;
        font-weight: $font-weight-bold;
        color: $color-secondary;
        text-transform: uppercase;
        margin-bottom: $space-lg;
      }

      .project-description {
        font-size: $font-size-md;
        line-height: 1.6;
        color: $color-text-primary;
      }
    }

    &__details {
      padding-left: $space-2xl;
      border-left: $border-thin-1 $color-secondary;

      .detail-row {
        margin-bottom: $space-lg;

        .detail-label {
          display: block;
          font-size: $font-size-md;
          font-weight: $font-weight-bold;
          color: $color-text-primary;
          margin-bottom: $space-xs;
        }

        .detail-value,
        li {
          font-size: $font-size-md;
          color: $color-text-primary;
          line-height: 1.4;
        }

        .responsibilities-list {
          list-style: disc;
          padding-left: $space-lg;

          li::marker {
            color: $color-secondary;
          }
        }
      }
    }
  }
}

.loading-state {
  padding: $space-2xl;
  text-align: center;
  color: $color-text-secondary;
}
</style>
