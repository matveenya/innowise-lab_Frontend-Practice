<template>
  <button class="skill-container">
    <ProgressBar mode="determinate" :value="currentPercentage" :show-value="false" :pt="skillPT" />
    <span class="skill-label">{{ skillLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';

type SkillLevel = 'novice' | 'advanced' | 'competent' | 'proficient' | 'expert';

const props = defineProps({
  level: {
    type: String,
    default: 'novice',
  },
  skillLabel: {
    type: String,
    default: 'Python',
  },
});
// TODO: move to constants
const LEVEL_SETTINGS: Record<SkillLevel, number> = {
  novice: 20,
  advanced: 40,
  competent: 60,
  proficient: 80,
  expert: 100,
};

const currentPercentage = computed(() => {
  return LEVEL_SETTINGS[props.level as SkillLevel] || LEVEL_SETTINGS.novice;
});

const skillPT = {
  root: { class: ['skill-bar-root', `type-${props.level}`] },
  value: { class: 'skill-bar-value' },
};
</script>

<style scoped lang="scss">
.skill-container {
  // min-width: 220px;
  height: $space-5xl;
  @include d-flex(center, center);
  padding: $space-sm $space-xl;
  gap: $space-lg;
  background-color: transparent;
  border-radius: $radius-3xl;
  color: $color-text-muted;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: $button-outline-hover;
  }
  span {
    min-width: 40%;
  }
}
:deep(.skill-bar-root) {
  width: 100%;
  height: $space-xs;
  overflow: hidden;
}
:deep(.skill-bar-value) {
  height: 100%;
}

:deep(.type-novice) {
  background-color: $color-novice-max;

  .skill-bar-value {
    background-color: $color-novice;
  }
}
:deep(.type-advanced) {
  background-color: $color-advanced-max;

  .skill-bar-value {
    background-color: $color-advanced;
  }
}
:deep(.type-competent) {
  background-color: $color-competent-max;

  .skill-bar-value {
    background-color: $color-competent;
  }
}
:deep(.type-proficient) {
  background-color: $color-proficient-max;

  .skill-bar-value {
    background-color: $color-proficient;
  }
}
:deep(.type-expert) {
  background-color: $color-expert;

  .skill-bar-value {
    background-color: $color-expert;
  }
}
</style>
