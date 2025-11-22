<template>
  <div class="floating-label-group">
    <input
      :id="id"
      ref="inputRef"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="floating-label-field"
    />
    <label :for="id" class="floating-label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number | null>({ required: true });

withDefaults(
  defineProps<{
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
  }
);

const inputRef = ref<HTMLInputElement | null>(null);

const focus = () => {
  inputRef.value?.focus();
};

defineExpose({
  focus,
});

const placeholder = ' ';
</script>

<style lang="scss" scoped>
.floating-label {
  position: absolute;
  top: $space-md;
  left: $space-md;
  transform: translateY(0%);
  font-size: $font-size-md;
  color: $color-text-secondary;
  pointer-events: none;
  transition: all 0.25s ease;

  &-group {
    position: relative;
    width: 100%;
  }

  &-field {
    width: 100%;
    background-color: $color-primary;
    border: $border-subtle;
    padding: $space-md;
    color: $color-text-primary;
    font-size: $font-size-md;
    outline: none;
    transition: border-color 0.2s ease;
    border-radius: $radius-sm;

    &:hover:not(:disabled) {
      border-color: $color-nav-link;
    }

    &:focus {
      border-color: $color-secondary;
    }

    &:focus:hover {
      border-color: $color-secondary;
    }

    &:not(:placeholder-shown) + .floating-label,
    &:focus + .floating-label {
      top: 0;
      left: $space-md;
      font-size: $font-size-sm;
      background-color: $color-primary;
      padding: 0 $space-2xs;
      transform: translateY(-50%);
    }

    &:focus + .floating-label {
      color: $color-secondary;
    }

    &:not(:focus):not(:placeholder-shown) + .floating-label {
      color: $color-text-secondary;
    }

    &:disabled {
      -webkit-text-fill-color: $color-text-muted;
      border-color: $color-border-subtle;
      cursor: default;

      & + .floating-label {
        color: $color-text-muted;
      }
      color: rgba($color-text-primary, $opacity-50);
    }
  }
}
:deep(.floating-label-field:-webkit-autofill),
:deep(.floating-label-field:-webkit-autofill:hover),
:deep(.floating-label-field:-webkit-autofill:focus) {
  -webkit-box-shadow: 0 0 0 1000px $color-primary inset;
  box-shadow: 0 0 0 1000px $color-primary inset;
  -webkit-text-fill-color: $color-text-primary;
  caret-color: $color-text-primary;
}
</style>
