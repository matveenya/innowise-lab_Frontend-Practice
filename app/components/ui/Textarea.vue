<template>
  <div class="form-group">
    <div class="floating-label-group">
      <textarea
        :id="inputId"
        class="floating-label-field floating-label-field--textarea"
        :class="{
          'is-error': errorMessage,
          'has-value': !!inputValue,
        }"
        :rows="rows"
        :placeholder="placeholder"
        :value="inputValue"
        :disabled="disabled"
        @input="handleInput"
        @blur="handleBlur"
      ></textarea>
      <label :for="inputId" class="floating-label">{{ label }}</label>
    </div>
    <span v-if="errorMessage" class="form-error">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef, watch, ref, type Ref } from 'vue';

const props = withDefaults(
  defineProps<{
    name?: string;
    label: string;
    rows?: number;
    placeholder?: string;
    validateOnBlur?: boolean;
    modelValue?: string;
    disabled?: boolean;
  }>(),
  {
    rows: 8,
    placeholder: ' ',
    validateOnBlur: true,
    name: undefined,
    modelValue: '',
    disabled: false,
  }
);

const emit = defineEmits(['update:modelValue']);

const inputId = props.name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

let inputValue;
let errorMessage;
let handleBlur;
let handleChange;

if (props.name) {
  const nameRef = toRef(props, 'name') as Ref<string>;

  const {
    value,
    errorMessage: error,
    handleBlur: blur,
    handleChange: change,
  } = useField(nameRef, undefined, {
    validateOnValueUpdate: !props.validateOnBlur,
    initialValue: props.modelValue,
  });

  inputValue = value;
  errorMessage = error;
  handleBlur = blur;
  handleChange = change;

  watch(
    () => props.modelValue,
    newValue => {
      if (newValue !== undefined) {
        value.value = newValue;
      }
    }
  );
} else {
  inputValue = toRef(props, 'modelValue');
  errorMessage = ref('');
  handleBlur = () => {};
  handleChange = null;
}

const handleInput = (event: Event) => {
  if (handleChange) {
    handleChange(event);
  }
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.form-group {
  text-align: left;
  width: 100%;

  .form-error {
    color: $color-secondary;
    font-size: $font-size-sm;
    margin-top: $space-xs;
    display: block;
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

  &:hover:not(:disabled) {
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

  &:disabled {
    opacity: 0.6;
    cursor: default;
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
