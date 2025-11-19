<template>
  <div class="skill-select">
    <Select
      v-model="model"
      append-to="body"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :option-group-label="optionGroupLabel"
      :option-group-children="optionGroupChildren"
      :placeholder="EMPTY_PLACEHOLDER"
      :disabled="disabled"
      :invalid="invalid"
      :scroll-height="'300px'"
      :pt="PASSTHROUGH_CONFIG"
      :pt-options="{ mergeProps: true }"
      class="skill-select__field"
      :class="{
        'skill-select__field--disabled': disabled,
        'skill-select__field--focused': isFocused || isOpen,
      }"
      @show="isOpen = true"
      @hide="isOpen = false"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #value="{ value }">
        <span v-if="isEmpty(value)" class="skill-select__value skill-select__value--empty">
          &nbsp;
        </span>
        <span v-else class="skill-select__value">{{ displayValue }}</span>
      </template>

      <template #dropdownicon>
        <div class="skill-select__icon-wrapper">
          <i
            class="pi pi-chevron-down skill-select__icon"
            :class="{ 'skill-select__icon--open': isOpen }"
          />
        </div>
      </template>

      <template #option="slotProps">
        <div
          class="skill-select__option"
          :class="{ 'skill-select__option--selected': isOptionSelected(slotProps.option) }"
        >
          {{ getOptionLabel(slotProps.option) }}
        </div>
      </template>
    </Select>

    <label
      class="skill-select__label"
      :class="{
        'skill-select__label--active': hasValue || isOpen,
        'skill-select__label--focused': isFocused || isOpen,
      }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts" generic="TOption = unknown, TValue = unknown">
import { computed, ref } from 'vue';
import Select from 'primevue/select';

interface SelectProps<TOption, TValue> {
  label?: string;
  options: TOption[];
  // eslint-disable-next-line no-unused-vars
  optionLabel?: string | ((option: TOption) => string);
  // eslint-disable-next-line no-unused-vars
  optionValue?: string | ((option: TOption) => TValue);

  // eslint-disable-next-line no-unused-vars
  optionGroupLabel?: string | ((group: Record<string, unknown>) => string);
  // eslint-disable-next-line no-unused-vars
  optionGroupChildren?: string | ((group: Record<string, unknown>) => TOption[]);
  disabled?: boolean;
  invalid?: boolean;
}

const EMPTY_PLACEHOLDER = ' ';

const PASSTHROUGH_CONFIG = {
  root: { class: 'skill-select__root' },
  label: { class: 'skill-select__native-label' },
  dropdown: { class: 'skill-select__dropdown' },
  overlay: { class: 'skill-select__overlay' },
  list: { class: 'skill-select__list' },
  option: { class: 'skill-select__native-option' },

  optionGroup: { class: 'skill-select__option-group' },
  optionGroupLabel: { class: 'skill-select__option-group-label' },
} as const;

const props = withDefaults(defineProps<SelectProps<TOption, TValue>>(), {
  label: '',
  disabled: false,
  invalid: false,
  optionLabel: undefined,
  optionValue: undefined,
  optionGroupLabel: undefined,
  optionGroupChildren: undefined,
});

const model = defineModel<TValue | null>({ required: true });
const isOpen = ref(false);
const isFocused = ref(false);

const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined || value === '';
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
  if (!option || isEmpty(model.value)) return false;
  return getOptionValue(option) === model.value;
};

const displayValue = computed(() => {
  if (props.optionGroupChildren) {
    const childrenProp = props.optionGroupChildren as string;

    for (const group of props.options as Record<string, unknown>[]) {
      const children = group[childrenProp];
      if (Array.isArray(children)) {
        const found = (children as TOption[]).find(opt => isOptionSelected(opt));
        if (found) return getOptionLabel(found);
      }
    }
    return '';
  }

  const selected = props.options.find(option => isOptionSelected(option));
  return selected ? getOptionLabel(selected) : '';
});

const hasValue = computed(() => !isEmpty(displayValue.value));
</script>

<style lang="scss">
@use 'sass:color';

.skill-select {
  position: relative;

  &:has(&__field:focus-within) &__label--active {
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

    &--active {
      font-size: $font-size-sm;
      padding: 0 $space-2xs;
      background-color: $color-primary;
      transform: translateY(-50%);

      &.skill-select__label--focused {
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
      &:hover:not(.p-focus):not(.skill-select__field--focused):not(:focus-within) {
        border-color: $color-nav-link;
      }

      &.skill-select__field--focused,
      &:focus-within {
        border-color: $color-secondary;
      }
    }

    &--disabled {
      pointer-events: none;

      .skill-select__value,
      .skill-select__native-label,
      .p-select-label {
        color: rgba($color-text-primary, $opacity-50);
      }
    }
    &,
    .p-select,
    .p-focus,
    span,
    .skill-select__native-label,
    .p-select-label,
    .p-select * {
      outline: none;
      box-shadow: none;
    }

    .skill-select__native-label,
    .p-select-label {
      flex: 1;
      padding: 0;
      overflow: hidden;
      color: $color-text-primary;
      font-size: $font-size-md;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;
    }

    .p-select-dropdown {
      display: none;
    }
  }

  &__value {
    color: $color-text-primary;
    font-size: $font-size-md;
    pointer-events: none;
    user-select: none;

    &--empty {
      color: transparent;
    }
  }

  &__icon-wrapper {
    position: absolute;
    top: 50%;
    right: $space-md;
    pointer-events: none;
    transform: translateY(-50%);
    @include d-flex(center, center);
  }

  &__icon {
    font-size: $font-size-xl;
    color: $color-text-secondary;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__overlay {
    background-color: color.adjust($color-primary, $lightness: -2%);
    border: $border-subtle;
    border-radius: $radius-sm;
    box-shadow: $shadow-md;
    max-height: 300px;
    overflow: hidden;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 280px;
    overflow-y: auto;
    width: 100% !important;
  }

  &__option-group {
    margin: 0;
    padding: 0;
    list-style: none;
    background: transparent;
  }

  &__option {
    padding: $space-sm $space-xl;
    color: $color-text-primary;
    cursor: pointer;
    background-color: color.adjust($color-primary, $lightness: -2%);
    transition: background-color 0.2s ease;

    &:hover:not(&--selected) {
      background-color: color.adjust($color-text-muted, $lightness: -15%);
    }

    &--selected {
      background:
        linear-gradient(rgba($color-secondary, 0.16), rgba($color-secondary, 0.16)),
        color.adjust($color-primary, $lightness: -2%);
      color: $color-text-primary;
      font-weight: $font-weight-medium;
      &:hover {
        background:
          linear-gradient(rgba($color-secondary, 0.24), rgba($color-secondary, 0.24)),
          color.adjust($color-primary, $lightness: -2%);
      }
    }
  }

  &__option-group-label {
    display: block;
    padding: $space-md $space-md;
    color: $color-secondary !important;
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    background-color: color.adjust($color-primary, $lightness: 0%) !important;
    pointer-events: none;
  }
}
</style>
