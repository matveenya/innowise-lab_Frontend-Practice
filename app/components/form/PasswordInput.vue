<template>
  <div class="form-group">
    <Field v-slot="{ field, errorMessage }" :name="name">
      <div class="password-wrapper">
        <input
          type="password"
          placeholder="Password"
          class="form-input"
          :class="{ 'is-error': errorMessage }"
          v-bind="field"
        />
        <Icon name="mdi:eye" size="1.2em" class="password-icon" mode="svg" />
      </div>
      <ErrorMessage :name="name" class="form-error" />
    </Field>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<style scoped lang="scss">
.form-group {
  text-align: left;
  width: 100%;

  .password-wrapper {
    position: relative;

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

    .password-icon {
      position: absolute;
      right: $space-lg;
      top: 50%;
      transform: translateY(-50%);
      color: $color-text-primary;
      z-index: 10;
      cursor: pointer;
    }
  }

  .form-error {
    color: $color-secondary;
    font-size: $font-size-sm;
    margin-top: $space-xs;
  }
}
</style>
