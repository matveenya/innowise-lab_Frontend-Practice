<template>
  <div class="search-input-wrapper">
    <Icon name="ic:baseline-search" size="1.5em" mode="svg" class="search-icon" />
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @keydown.esc="clearInput"
    />
    <button
      v-if="model"
      class="clear-button"
      type="button"
      aria-label="Clear search"
      @click="clearInput"
    >
      <Icon name="material-symbols:close-rounded" size="1.25em" mode="svg" />
    </button>
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

const clearInput = () => {
  model.value = '';
};
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

.clear-button {
  position: absolute;
  right: $space-md;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: $space-xs;
  @include d-flex(center, center);
  color: $color-text-secondary;
  cursor: pointer;
  border-radius: $radius-rounded;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: $color-text-primary;
    background-color: rgba($color-text-primary, 0.08);
  }
}
</style>
