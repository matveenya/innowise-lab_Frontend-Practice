<template>
  <div class="form-group">
    <Field v-slot="{ field, errorMessage }" :name="name">
      <div class="form-input-wrapper">
        <input
          :id="name"
          :type="inputType"
          :placeholder="placeholder"
          class="form-input"
          :class="{
            'is-error': errorMessage,
            'has-value': !!field.value,
          }"
          v-bind="field"
        />
        <label class="form-input__label" :for="name">
          {{ label }}
        </label>
        <Icon
          :name="inputType === 'password' ? 'mdi:eye' : 'mdi:eye-off'"
          size="1.2em"
          class="password-icon"
          mode="svg"
          @click="togglePasswordVisibility"
        />
      </div>
      <ErrorMessage :name="name" class="form-error" />
    </Field>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
}>();

const isPasswordVisible = ref(false);

const inputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

const togglePasswordVisibility = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped lang="scss">
.form-group {
  text-align: left;
  width: 100%;

  .form-input-wrapper {
    position: relative;
    width: 100%;
  }

  .form-input {
    width: 100%;
    padding: $space-md $space-xl $space-md $space-lg;
    border-radius: $radius-sm;
    border: $border-outline;
    background-color: transparent;
    color: $color-text-primary;
    font-size: $font-size-md;
    transition: border-color 0.2s ease;

    &::placeholder {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:focus {
      outline: none;
      border: $border-outline-active;
    }

    &:focus + .form-input__label,
    &.has-value + .form-input__label,
    &:-webkit-autofill + .form-input__label {
      top: 0;
      left: $space-lg;
      font-size: 0.75em;
      transform: translateY(-50%);
      background-color: $color-primary;
      padding: 0 $space-xs;
      z-index: 2;
    }

    &:focus::placeholder,
    &.has-value::placeholder {
      opacity: 1;
    }

    &:focus + .form-input__label {
      color: $color-secondary;
    }

    &.is-error + .form-input__label {
      color: $color-secondary;
    }

    &.is-error {
      border-color: $color-secondary;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px $color-primary inset !important;
      -webkit-text-fill-color: $color-text-primary !important;
      caret-color: $color-text-primary;
    }
  }

  .form-input__label {
    position: absolute;
    top: 50%;
    left: $space-lg;
    transform: translateY(-50%);
    font-size: $font-size-md;
    color: rgba(255, 255, 255, 0.7);
    pointer-events: none;
    transition: all 0.2s ease;
    z-index: 1;
  }

  .password-icon {
    position: absolute;
    right: $space-lg;
    top: 50%;
    transform: translateY(-50%);
    color: $color-text-primary;
    z-index: 3;
    cursor: pointer;
  }

  .form-error {
    color: $color-secondary;
    font-size: $font-size-sm;
    margin-top: $space-xs;
  }
}
</style>
