<template>
  <div class="form-group">
    <input :type="type" :placeholder="placeholder" class="form-input" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: string;
  placeholder: string;
}>();
</script>

<style scoped lang="scss">
.form-group {
  text-align: left;
  width: 100%;
}

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
}
</style>
