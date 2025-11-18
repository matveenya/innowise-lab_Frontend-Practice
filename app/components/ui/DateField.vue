<template>
  <div class="floating-label-group">
    <DatePicker v-model="model" :input-id="id" show-icon :pt="datePickerPT" />
    <label :for="id" class="floating-label" :class="{ 'floating-label--active': !!model }">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<Date | null>();

defineProps<{
  id: string;
  label: string;
}>();

type DatePickerRootState = { focused: boolean };
type DatePickerRootProps = { modelValue: unknown };
type DatePickerDayContext = { selected: boolean; disabled: boolean };

const datePickerPT = {
  root: ({ props, state }: { props: DatePickerRootProps; state: DatePickerRootState }) => ({
    class: [
      'cv-datepicker-root',
      {
        'p-focus': state.focused,
        'p-filled': props.modelValue != null,
      },
    ],
  }),
  pcInput: {
    root: { class: 'cv-datepicker-input-element' },
  },
  input: { class: 'cv-datepicker-input-element' },
  dropdown: { class: 'cv-datepicker-trigger' },
  panel: { class: 'cv-overlay' },
  header: { class: 'cv-datepicker-header' },
  title: { class: 'cv-datepicker-title' },
  table: { class: 'cv-datepicker-table' },
  day: ({ context }: { context: DatePickerDayContext }) => ({
    class: [
      'cv-datepicker-day',
      {
        'cv-datepicker-day--selected': context.selected,
        'cv-datepicker-day--disabled': context.disabled,
      },
    ],
  }),
};
</script>

<style lang="scss">
.floating-label-group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.floating-label {
  position: absolute;
  top: $space-md;
  left: $space-md;
  font-size: $font-size-md;
  color: $color-text-secondary;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
  padding: 0 $space-2xs;
  line-height: 1.5;
  background-color: transparent;

  &--active,
  .cv-datepicker-root.p-focus + & {
    top: 0;
    transform: translateY(-50%);
    font-size: $font-size-sm;
    background-color: $color-primary;
    color: $color-text-secondary;
  }

  .cv-datepicker-root.p-focus + & {
    color: $color-secondary;
  }
}

.cv-datepicker-root {
  display: inline-flex;
  width: 100%;
  position: relative;
  background-color: $color-primary;
  border: $border-subtle;
  border-radius: $radius-sm;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: $color-nav-link;
  }

  &.p-focus {
    border-color: $color-secondary;
  }
}

.cv-datepicker-root input,
.cv-datepicker-input-element {
  flex: 1 1 auto;
  width: 100%;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  padding: $space-md;
  padding-right: $space-4xl;
  color: $color-text-primary !important;
  font-size: $font-size-md;
  border-radius: $radius-sm;

  &::placeholder {
    opacity: 0;
  }
}

button.cv-datepicker-trigger {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: $space-4xl;
  background: transparent;
  border: none;
  color: $color-text-secondary;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.cv-overlay {
  background: $color-primary;
  border: $border-subtle;
  border-radius: $radius-sm;
  box-shadow: $shadow-md;
  margin-top: $space-2xs;
  z-index: 1005;
  color: $color-text-primary;
}

.cv-datepicker-header {
  padding: $space-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: $border-subtle;
  background-color: $color-primary;
  color: $color-text-primary;

  button {
    color: $color-text-primary;
    background: transparent;
    cursor: pointer;
    padding: $space-xs;
    border-radius: $radius-rounded;
    border: none;

    &:hover {
      background-color: $button-bg-disabled;
    }
  }
}

.cv-datepicker-title {
  font-weight: $font-weight-bold;
}

.cv-datepicker-table {
  width: 100%;
  margin: $space-sm 0;
  border-collapse: collapse;

  th {
    padding: $space-xs;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-regular;
  }

  td {
    padding: 0;
  }
}

.cv-datepicker-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $space-3xl;
  height: $space-3xl;
  border-radius: $radius-rounded;
  cursor: pointer;
  margin: 0 auto;
  color: $color-text-primary;
  transition: background-color 0.2s;

  &:hover:not(.cv-datepicker-day--selected) {
    background-color: $button-bg-disabled;
  }

  &--selected {
    background-color: $color-secondary;
    color: $color-text-primary;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
