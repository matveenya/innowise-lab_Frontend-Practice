<template>
  <button type="button" class="button" :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'outline' | 'ghost';

const props = defineProps<{
  variant: Variant;
  disabled?: boolean;
}>();

const buttonClasses = computed(() => ({
  [`button__${props.variant}`]: props.variant,
  'button--disabled': props.disabled,
}));
</script>

<style scoped lang="scss">
.button {
  --background-color: #{$button-primary-bg};
  --text-color: #{$button-primary-text};
  --border-color: #{$button-primary-bg};
  --hover-background-color: #{$button-primary-hover};

  padding: $space-sm $space-lg;
  vertical-align: middle;
  background-color: var(--background-color);
  border-radius: $radius-3xl;
  border: 1px solid var(--border-color);
  cursor: pointer;
  color: var(--text-color);
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  line-height: 1.75;
  text-transform: uppercase;
  transition: all 0.25s ease;

  &__primary {
    --background-color: #{$button-primary-bg};
    --text-color: #{$button-primary-text};
    --border-color: #{$button-primary-bg};
    --hover-background-color: #{$button-primary-hover};

    &:hover {
      --border-color: #{$color-secondary};
      background-color: var(--hover-background-color);
    }
  }

  &__outline {
    --background-color: #{$button-outline-bg};
    --text-color: #{$button-outline-text};
    --border-color: rgba(#{$color-secondary}, #{$opacity-50});
    --hover-background-color: #{$button-outline-hover};

    &:hover {
      --border-color: #{$color-secondary};
    }
  }

  &__ghost {
    --background-color: #{$button-ghost-bg};
    --text-color: #{$button-ghost-text};
    --border-color: transparent;
    --hover-background-color: #{$button-ghost-hover};
    &:hover {
      background-color: var(--hover-background-color);
    }
  }
  &--disabled {
    --background-color: #{$button-bg-disabled};
    --text-color: #{$color-text-primary-disabled};
    --border-color: transparent;
    pointer-events: none;
    cursor: default;
  }
}
</style>
