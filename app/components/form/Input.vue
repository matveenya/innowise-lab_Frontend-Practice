<template>
  <div class="form-group">
    <Field v-slot="{ field, errorMessage }" :name="name">
      <input
        :type="type"
        :placeholder="placeholder"
        class="form-input"
        :class="{ 'is-error': errorMessage }"
        v-bind="field"
      />
      <ErrorMessage :name="name" class="form-error" />
    </Field>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  type: string;
  placeholder: string;
}>();
</script>

<style scoped lang="scss">
.form-group {
  text-align: left;
  width: 100%;

  .form-input {
    width: 100%;
    padding: $space-md $space-lg;
    border-radius: $radius-sm;
    border: $border-outline;
    background-color: transparent;
    color: $color-text-primary;
    font-size: $font-size-md;

    &:focus {
      outline: none;
      border: $border-outline-hover;
    }

    &.is-error {
      border-color: $color-secondary;
    }
  }

  .form-error {
    color: $color-secondary;
    font-size: $font-size-sm;
    margin-top: $space-xs;
  }
}
</style>
