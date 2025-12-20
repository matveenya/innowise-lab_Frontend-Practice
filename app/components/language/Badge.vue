<template>
  <button
    class="language-container"
    :class="{
      'is-selected-for-delete': isSelected,
      'is-editable': isEditable || isDeleteMode,
    }"
    @click="handleClick"
  >
    <p class="language-proficiency" :class="`proficiency-${proficiencyColor}`">
      {{ proficiency }}
    </p>
    <span class="language-label">{{ languageLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import { PROFICIENCY_COLOR_MAP, type Proficiency } from '~/constants/languages';

const props = defineProps<{
  proficiency: Proficiency;
  languageLabel: string;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  isEditable?: boolean;
}>();

const emit = defineEmits(['click']);

const proficiencyColor = computed(() => {
  return PROFICIENCY_COLOR_MAP[props.proficiency] || 'novice';
});

const handleClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">
.language-container {
  min-width: $button-width;
  height: $space-5xl;
  @include d-flex(center, center);
  padding: $space-sm $space-lg;
  gap: $space-3xl;
  background-color: transparent;
  border-radius: $radius-3xl;
  color: $color-text-muted;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: $font-weight-medium;
  font-size: $font-size-sm;
  line-height: 1.75;
  text-align: left;

  &.is-editable {
    cursor: pointer;

    &:hover {
      background-color: $button-outline-hover;
    }
  }

  &.is-selected-for-delete {
    .language-label {
      display: block;
      width: 100%;
      color: $color-text-primary;
    }
    .language-proficiency {
      background-color: transparent;
      color: $color-text-primary;
    }
  }
}

.language-proficiency {
  @include d-flex(center, center);
  min-width: $space-5xl;
  line-height: 1.5;
  transition: all 0.3s ease;
}

.language-label {
  flex: 1;
  text-align: left;
  color: $color-text-muted;
  font-size: $font-size-md;
}

$proficiency-colors: (
  novice: $color-novice,
  advanced: $color-advanced,
  competent: $color-competent,
  proficient: $color-proficient,
  secondary: $color-secondary,
);

@each $name, $color in $proficiency-colors {
  .proficiency-#{$name} {
    color: $color;
  }
}
</style>
