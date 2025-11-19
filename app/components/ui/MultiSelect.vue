<template>
  <div class="multiselect">
    <MultiSelect
      v-model="model"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="EMPTY_PLACEHOLDER"
      :disabled="disabled"
      :invalid="invalid"
      :pt="PASSTHROUGH_CONFIG"
      :pt-options="{ mergeProps: true }"
      class="multiselect__field"
      :class="{
        'multiselect__field--disabled': disabled,
        'multiselect__field--focused': isFocused || isOpen,
      }"
      display="custom"
      @show="isOpen = true"
      @hide="isOpen = false"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #value>
        <span v-if="isEmpty(model)" class="multiselect__value multiselect__value--empty">
          &nbsp;
        </span>
        <span v-else class="multiselect__value">{{ displayValue }}</span>
      </template>

      <template #dropdownicon>
        <div class="multiselect__icon-wrapper">
          <Icon
            name="heroicons:chevron-down"
            class="multiselect__icon"
            :class="{ 'multiselect__icon--open': isOpen }"
          />
        </div>
      </template>

      <template #option="slotProps">
        <div
          class="multiselect__option"
          :class="{ 'multiselect__option--selected': isOptionSelected(slotProps.option) }"
        >
          {{ getOptionLabel(slotProps.option) }}
          <Icon
            v-if="isOptionSelected(slotProps.option)"
            name="material-symbols:check"
            class="multiselect__check-icon"
          />
        </div>
      </template>
    </MultiSelect>

    <label
      class="multiselect__label"
      :class="{
        'multiselect__label--active': hasValue || isOpen,
        'multiselect__label--focused': isFocused || isOpen,
      }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts" generic="TOption = any, TValue = any">
import { computed, ref } from 'vue';
import MultiSelect from 'primevue/multiselect';

interface MultiSelectProps<TOption, TValue> {
  label: string;
  options: TOption[];
  /* eslint-disable no-unused-vars */
  optionLabel?: string | ((item: TOption) => string);
  optionValue?: string | ((item: TOption) => TValue);
  /* eslint-enable no-unused-vars */
  disabled?: boolean;
  invalid?: boolean;
}

const EMPTY_PLACEHOLDER = ' ';

const PASSTHROUGH_CONFIG = {
  root: { class: 'multiselect__root' },
  label: { class: 'multiselect__native-label' },
  labelContainer: { class: 'multiselect__label-container' },
  dropdown: { class: 'multiselect__dropdown' },
  overlay: { class: 'multiselect__overlay' },
  list: { class: 'multiselect__list' },
  option: { class: 'multiselect__native-option' },
  header: { class: 'multiselect__header' },
} as const;

const props = withDefaults(defineProps<MultiSelectProps<TOption, TValue>>(), {
  disabled: false,
  invalid: false,
  optionLabel: undefined,
  optionValue: undefined,
});

const model = defineModel<TValue[] | null>({ required: true });
const isOpen = ref(false);
const isFocused = ref(false);

const isEmpty = (value: unknown): boolean => {
  return !value || (Array.isArray(value) && value.length === 0);
};

const getOptionLabel = (option: TOption): string => {
  if (!option) return '';

  const { optionLabel } = props;
  if (typeof optionLabel === 'function') {
    return optionLabel(option);
  }
  if (typeof optionLabel === 'string') {
    return ((option as Record<string, unknown>)[optionLabel] as string) ?? '';
  }
  return String(option);
};

const getOptionValue = (option: TOption): TValue => {
  const { optionValue } = props;
  if (typeof optionValue === 'function') {
    return optionValue(option);
  }
  if (typeof optionValue === 'string') {
    return (option as Record<string, unknown>)[optionValue] as TValue;
  }
  return option as unknown as TValue;
};

const isOptionSelected = (option: TOption): boolean => {
  if (!option || !model.value) return false;
  const val = getOptionValue(option);
  return model.value.includes(val);
};

const displayValue = computed(() => {
  if (!model.value || model.value.length === 0) return '';

  const selectedOptions = props.options.filter(option => isOptionSelected(option));
  return selectedOptions.map(opt => getOptionLabel(opt)).join(', ');
});

const hasValue = computed(() => !isEmpty(model.value));
</script>

<style lang="scss">
.multiselect {
  position: relative;
  width: 100%;

  &:has(.multiselect__field:focus-within) .multiselect__label--active {
    color: $color-secondary;
  }

  &__label {
    position: absolute;
    top: 0;
    left: $space-md;
    color: $color-text-secondary;
    font-size: $font-size-md;
    pointer-events: none;
    transition:
      font-size 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
    transform-origin: 0 0;
    transform: translateY($space-md);
    z-index: 1;

    &--active {
      font-size: $font-size-sm;
      padding: 0 $space-2xs;
      background-color: $color-primary;
      transform: translateY(-50%);

      &.multiselect__label--focused {
        color: $color-secondary;
      }
    }
  }

  &__field {
    position: relative;
    width: 100%;
    padding: $space-md $space-4xl $space-md $space-md;
    background-color: $color-primary;
    border: $border-subtle;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: border-color 0.2s ease;
    @include d-flex(flex-start, center);

    &:not(&--disabled) {
      &:hover:not(.p-focus):not(.multiselect__field--focused):not(:focus-within) {
        border-color: $color-nav-link;
      }

      &.multiselect__field--focused,
      &:focus-within {
        border-color: $color-secondary;
      }
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.6;
    }

    &.p-multiselect,
    &.p-focus,
    span,
    .multiselect__label-container,
    .p-multiselect-label,
    .p-multiselect * {
      outline: none;
      box-shadow: none;
    }

    .multiselect__label-container {
      flex: 1;
      overflow: hidden;
      @include d-flex(flex-start, center);
    }

    .p-multiselect-trigger {
      display: none;
    }
  }

  &__value {
    color: $color-text-primary;
    font-size: $font-size-md;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;

    &--empty {
      color: transparent;
    }
  }

  &__icon {
    &-wrapper {
      position: absolute;
      top: 50%;
      right: $space-md;
      pointer-events: none;
      transform: translateY(-50%);
      @include d-flex(center, center);
    }

    font-size: $font-size-xl;
    color: $color-text-secondary;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__overlay {
    background: $overlay-bg-color;
    border: $border-subtle;
    border-radius: $radius-sm;
    padding: $space-sm 0;
    box-shadow: $shadow-md;
    z-index: 1005;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__header {
    padding: $space-sm $space-md;
    border-bottom: $border-subtle;
    @include d-flex(center, center);
    color: $color-text-primary;

    .p-checkbox {
      margin-right: $space-sm;
    }
  }

  &__option {
    padding: $space-sm $space-md;
    color: $color-text-primary;
    cursor: pointer;
    transition: background-color 0.2s ease;
    @include d-flex(space-between, center);

    &--selected {
      background: linear-gradient(rgba($color-secondary, 0.16), rgba($color-secondary, 0.16));
      color: $color-text-primary;
      font-weight: $font-weight-medium;

      &:hover {
        background: linear-gradient(rgba($color-secondary, 0.24), rgba($color-secondary, 0.24));
      }
    }
  }

  &__check-icon {
    font-size: $space-xl;
    color: $color-secondary;
  }
}
</style>
