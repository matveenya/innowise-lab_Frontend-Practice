<template>
  <div class="form-group">
    <Field v-slot="{ field, errorMessage }" :name="name" :validate-on-blur="validateOnBlur">
      <div class="floating-label-group">
        <textarea
          :id="name"
          class="floating-label-field floating-label-field--textarea"
          :class="{
            'is-error': errorMessage,
            'has-value': !!field.value,
          }"
          :rows="rows"
          :placeholder="placeholder"
          v-bind="field"
        ></textarea>
        <label :for="name" class="floating-label">{{ label }}</label>
      </div>
      <ErrorMessage :name="name" class="form-error" />
    </Field>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    label: string;
    rows?: number;
    placeholder?: string;
    validateOnBlur?: boolean;
  }>(),
  {
    rows: 8,
    placeholder: ' ',
    validateOnBlur: true,
  }
);
</script>

<style lang="scss" scoped>
.form-group {
  text-align: left;
  width: 100%;

  .form-error {
    color: $color-secondary;
    font-size: $font-size-sm;
    margin-top: $space-xs;
  }
}

.floating-label-group {
  position: relative;
  width: 100%;
}

.floating-label-field {
  width: 100%;
  background-color: $color-primary;
  border: $border-subtle;
  padding: $space-md;
  color: $color-text-primary;
  font-size: $font-size-md;
  outline: none;
  transition: border-color 0.2s ease;
  border-radius: $radius-sm;
  resize: none;

  &::placeholder {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    border-color: $color-nav-link;
  }

  &:focus {
    outline: none;
    border-color: $color-secondary;
  }

  &.is-error {
    border-color: $color-secondary;

    & + .floating-label {
      color: $color-secondary;
    }
  }

  &:focus + .floating-label,
  &.has-value + .floating-label,
  &:not(:placeholder-shown) + .floating-label {
    top: 0;
    left: $space-md;
    font-size: $font-size-sm;
    background-color: $color-primary;
    padding: 0 $space-2xs;
    transform: translateY(-50%);
    z-index: 2;
  }

  &:focus + .floating-label {
    color: $color-secondary;
  }

  &:focus::placeholder,
  &.has-value::placeholder {
    opacity: 1;
  }
}

.floating-label {
  position: absolute;
  top: $space-md;
  left: $space-md;
  transform: translateY(0%);
  font-size: $font-size-md;
  color: $color-text-secondary;
  pointer-events: none;
  transition: all 0.25s ease;
  z-index: 1;
}
</style>
