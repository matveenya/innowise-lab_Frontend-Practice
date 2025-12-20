<template>
  <main v-if="cv" class="cv-preview-page">
    <PreviewHeader :user="cv?.user" @export-pdf="exportToPdf" />

    <section class="cv-preview-page__main-info">
      <PreviewInfoSide :education="cv?.education" :domains="projectDomains" />

      <div class="cv-preview-page__right-column">
        <section class="description-section">
          <h3 class="description-title">{{ cv?.name }}</h3>
          <p class="description-text">
            {{ cv?.description }}
          </p>
          <PreviewSkills v-if="groupedSkills.length" :groups="groupedSkills" />
        </section>
      </div>
    </section>

    <section class="cv-preview-page__projects">
      <h2 class="section-title">Projects</h2>

      <div class="projects-list">
        <PreviewProjectCard
          v-for="project in cv?.projects"
          :key="project.id"
          :project="project"
          :user-position="userPosition"
        />
      </div>
    </section>

    <ProfessionalSkillsTable v-if="groupedSkills.length" :groups="groupedSkills" />
  </main>
  <div v-else-if="loading" class="loading-state">Loading...</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCv } from '~/composables/useCv';
import { useReferencesStore } from '~/stores/references';
import PreviewHeader from '~/components/cvs/PreviewHeader.vue';
import PreviewInfoSide from '~/components/cvs/PreviewInfoSide.vue';
import PreviewProjectCard from '~/components/cvs/PreviewProjectCard.vue';
import PreviewSkills from '~/components/cvs/PreviewSkills.vue';
import ProfessionalSkillsTable, {
  type SkillGroupDisplay,
  type SkillItemDisplay,
} from '~/components/cvs/ProfessionalSkillsTable.vue';
import { generateCvPdf } from '~/utils/pdfGenerator';
import { safeParseDate } from '~/utils/dateUtils';

definePageMeta({
  layout: 'cv-details',
});

const { cv, loading } = useCv();
const referencesStore = useReferencesStore();

onMounted(() => {
  referencesStore.loadReferences();
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

const calculateSkillStats = (
  skillName: string
): { experience: number | string; lastUsed: number | string } => {
  if (!cv.value?.projects) return { experience: 0, lastUsed: '-' };

  const matchedProjects = cv.value.projects.filter(p =>
    p.environment?.some(env => env.toLowerCase() === skillName.toLowerCase())
  );

  if (matchedProjects.length === 0) return { experience: 0, lastUsed: '-' };

  let totalDurationMs = 0;
  let maxEndDate: Date | null = null;
  let isCurrentlyUsed = false;

  for (const p of matchedProjects) {
    const start = safeParseDate(p.start_date);
    if (!start) continue;

    const end = safeParseDate(p.end_date);
    const effectiveEnd = end || new Date();

    if (!end) isCurrentlyUsed = true;

    if (effectiveEnd > start) {
      totalDurationMs += effectiveEnd.getTime() - start.getTime();
    }

    if (!maxEndDate || effectiveEnd > maxEndDate) {
      maxEndDate = effectiveEnd;
    }
  }

  const years = Math.floor(totalDurationMs / (1000 * 60 * 60 * 24 * 365));

  const lastUsedYear = isCurrentlyUsed
    ? new Date().getFullYear()
    : (maxEndDate?.getFullYear() ?? '-');

  return {
    experience: years < 1 && totalDurationMs > 0 ? '< 1' : years,
    lastUsed: lastUsedYear,
  };
};

const groupedSkills = computed<SkillGroupDisplay[]>(() => {
  if (!cv.value?.skills || referencesStore.skills.length === 0) return [];

  const groups: Record<string, SkillItemDisplay[]> = {};

  cv.value.skills.forEach(cvSkill => {
    const refSkill = referencesStore.skills.find(s => s.name === cvSkill.name);
    const categoryName = refSkill?.category_name || 'Other';

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    const stats = calculateSkillStats(cvSkill.name);

    groups[categoryName].push({
      name: cvSkill.name,
      experience: stats.experience,
      lastUsed: stats.lastUsed,
    });
  });

  return Object.entries(groups).map(([category, items]) => ({
    category,
    items,
  }));
});

const exportToPdf = () => {
  if (!cv.value) return;
  generateCvPdf(cv.value, userPosition.value, projectDomains.value, groupedSkills.value);
};
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

  &__right-column {
    @include d-flex(flex-start, stretch, column);
    gap: $space-lg;
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
