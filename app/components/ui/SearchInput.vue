<template>
  <div class="search-input-wrapper">
    <Icon name="ic:baseline-search" size="1.5em" mode="svg" class="search-icon" />
    <input v-model="model" type="text" :placeholder="placeholder" class="search-input" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number>({ required: true });

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: 'Search',
  }
);
</script>

<style scoped lang="scss">
.search-input-wrapper {
  position: relative;
  width: $input-width-cvs;
}

.search-input {
  width: 100%;
  padding: $space-md $space-lg $space-md $space-4xl;
  border-radius: $radius-2xl;
  border: $border-outline;
  background-color: $color-primary;
  color: $color-text-primary;
  font-size: $font-size-md;
  box-shadow: none;

  &:hover {
    border-color: $color-text-primary;
  }

  &:focus {
    outline: none;
    border: $border-outline-active;
  }

  &::placeholder {
    color: $color-text-muted;
  }
}

.search-icon {
  position: absolute;
  left: $space-md;
  top: 50%;
  transform: translateY(-50%);
  color: $color-text-primary;
}
</style>
