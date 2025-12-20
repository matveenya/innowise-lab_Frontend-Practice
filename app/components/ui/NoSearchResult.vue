<template>
  <div class="no-results" role="status">
    <h5 class="no-results__title">No results found</h5>
    <p class="no-results__message">Try another search, check the spelling or use a broader term</p>
    <Button variant="ghost" @click="resetSearch">Reset search</Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

const emit = defineEmits(['resetSearch']);

const resetSearch = () => {
  emit('resetSearch');
};
</script>

<style lang="scss">
.no-results {
  width: 100%;
  padding-block: $space-6xl;
  @include d-flex(stretch, center, column);
  gap: $space-lg;

  &__title {
    font-size: $font-size-2xl;
    line-height: 1.35;
  }
  &__message {
    font-size: $font-size-md;

    line-height: 1.5;
  }
}
</style>
