<template>
  <div class="select">
    <Select
      v-model="model"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="EMPTY_PLACEHOLDER"
      :disabled="disabled"
      :invalid="invalid"
      :pt="PASSTHROUGH_CONFIG"
      :pt-options="{ mergeProps: true }"
      class="select__field"
      :class="{
        'select__field--disabled': disabled,
        'select__field--focused': isFocused || isOpen,
      }"
      @show="isOpen = true"
      @hide="isOpen = false"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template #value="{ value }">
        <span v-if="isEmpty(value)" class="select__value select__value--empty"> &nbsp; </span>
        <span v-else class="select__value">{{ displayValue }}</span>
      </template>

      <template #dropdownicon>
        <div class="select__icon-wrapper">
          <Icon
            name="heroicons:chevron-down"
            class="select__icon"
            :class="{ 'select__icon--open': isOpen }"
          />
        </div>
      </template>

      <template #option="slotProps">
        <div
          class="select__option"
          :class="{ 'select__option--selected': isOptionSelected(slotProps.option) }"
        >
          {{ getOptionLabel(slotProps.option) }}
        </div>
      </template>
    </Select>

    <label
      class="select__label"
      :class="{
        'select__label--active': hasValue || isOpen,
        'select__label--focused': isFocused || isOpen,
      }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts" generic="TOption = any, TValue = any">
import { computed, ref } from 'vue';
import Select from 'primevue/select';

interface SelectProps<TOption, TValue> {
  label: string;
  options: TOption[];
  // eslint-disable-next-line no-unused-vars
  optionLabel?: string | ((option: TOption) => string);
  // eslint-disable-next-line no-unused-vars
  optionValue?: string | ((option: TOption) => TValue);
  disabled?: boolean;
  invalid?: boolean;
}

const EMPTY_PLACEHOLDER = ' ';

const PASSTHROUGH_CONFIG = {
  root: { class: 'select__root' },
  label: { class: 'select__native-label' },
  dropdown: { class: 'select__dropdown' },
  overlay: { class: 'select__overlay' },
  list: { class: 'select__list' },
  option: { class: 'select__native-option' },
} as const;

const props = withDefaults(defineProps<SelectProps<TOption, TValue>>(), {
  disabled: false,
  invalid: false,
  optionLabel: undefined,
  optionValue: undefined,
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
  const selected = props.options.find(option => isOptionSelected(option));
  return selected ? getOptionLabel(selected) : '';
});

const hasValue = computed(() => !isEmpty(displayValue.value));
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;

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

      &.select__label--focused {
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
      &:hover:not(.p-focus) {
        border-color: $color-nav-link;
      }

      &.select__field--focused,
      &:focus-within {
        border-color: $color-secondary;
      }
    }

    &--disabled {
      pointer-events: none;
    }

    &,
    :deep(:is(.p-select, .p-focus, span, &__native-label, .p-select-label)),
    :deep(.p-select *) {
      outline: none;
      box-shadow: none;
    }

    :deep(:is(&__native-label, .p-select-label)) {
      flex: 1;
      padding: 0;
      overflow: hidden;
      color: $color-text-primary;
      font-size: $font-size-md;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;
    }

    :deep(.p-select-dropdown) {
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
    :deep(&) {
      background: $overlay-bg-color;
      border: $border-subtle;
      border-radius: $radius-sm;
      padding: $space-sm 0;
      box-shadow: $shadow-md;
    }
  }

  &__list {
    :deep(&) {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  &__option {
    padding: $space-sm $space-md;
    color: $color-text-primary;
    cursor: pointer;
    background-color: rgba($overlay-bg-color, 0.2);
    transition: background-color 0.2s ease;

    &:hover:not(&--selected) {
      background-color: rgba($color-text-primary, 0.08);
    }

    &--selected {
      background-color: rgba($color-secondary, 0.16);
      color: $color-text-primary;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
