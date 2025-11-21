<template>
  <article class="project-card">
    <div class="project-card__main">
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ project.description }}</p>
    </div>

    <aside class="project-card__details">
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

      <div v-if="project.environment?.length" class="detail-row">
        <span class="detail-label">Environment</span>
        <span class="detail-value">{{ project.environment.join(', ') }}.</span>
      </div>
    </aside>
  </article>
</template>

<script setup lang="ts">
import { formatDateNumeric } from '~/utils/dateUtils';
import type { CvProject } from 'cv-graphql';

defineProps<{
  project: CvProject;
  userPosition?: string;
}>();
</script>

<style lang="scss" scoped>
.project-card {
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
</style>
