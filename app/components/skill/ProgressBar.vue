<template>
  <button
    class="skill-container"
    :class="{ 'is-selected-for-delete': isSelected, 'is-readonly': readonly }"
    @click="handleClick"
  >
    <ProgressBar
      mode="determinate"
      :value="isSelected ? 0 : currentPercentage"
      :show-value="false"
      :pt="skillPT"
    />
    <span class="skill-label">{{ skillLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import type { SkillLevel } from '~/graphql/types/skill';
import { SKILL_LEVEL_SETTINGS } from '~/constants/skills';

const props = defineProps<{
  level: string;
  skillLabel: string;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits(['click']);

const normalizedLevel = computed<SkillLevel>(() => {
  const lower = props.level?.toLowerCase() as SkillLevel | undefined;
  return lower && SKILL_LEVEL_SETTINGS[lower] ? lower : 'novice';
});

const currentPercentage = computed(() => {
  return SKILL_LEVEL_SETTINGS[normalizedLevel.value];
});

const handleClick = () => {
  emit('click');
};

const skillPT = computed(() => ({
  root: {
    class: [
      'skill-bar-root',
      `type-${normalizedLevel.value}`,
      { 'is-delete-selected': props.isSelected },
    ],
  },
  value: { class: 'skill-bar-value' },
}));
</script>

<style scoped lang="scss">
@use 'sass:list';

.skill-container {
  min-width: $button-width;
  height: $space-5xl;
  @include d-flex(center, center);
  padding: $space-sm $space-xl;
  gap: $space-lg;
  background-color: transparent;
  border-radius: $radius-3xl;
  color: $color-text-muted;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.is-selected-for-delete {
    .skill-label {
      color: $color-text-primary !important;
    }
  }

  &.is-readonly {
    cursor: default;
    &:hover {
      background-color: transparent;
    }
  }

  &:not(.is-readonly):hover {
    background-color: $button-outline-hover;
  }
  span {
    min-width: 40%;
    white-space: nowrap;
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

:deep(.is-delete-selected) {
  background-color: $color-novice-max !important;
}

$skill-colors: (
  novice: (
    $color-novice-max,
    $color-novice,
  ),
  advanced: (
    $color-advanced-max,
    $color-advanced,
  ),
  competent: (
    $color-competent-max,
    $color-competent,
  ),
  proficient: (
    $color-proficient-max,
    $color-proficient,
  ),
  expert: (
    $color-expert,
    $color-expert,
  ),
);

@each $name, $pair in $skill-colors {
  $bg-max: list.nth($pair, 1);
  $bg-value: list.nth($pair, 2);

  :deep(.type-#{$name}) {
    background-color: $bg-max;

    .skill-bar-value {
      background-color: $bg-value;
    }
  }
}
</style>
