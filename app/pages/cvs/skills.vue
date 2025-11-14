<template>
  <div class="cv-skills">
    <div class="cv-skills__button-container">
      <button class="add-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD SKILL
      </button>
    </div>

    <div class="cv-skills__content"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'cv-details',
});
</script>

<style lang="scss" scoped>
.cv-skills {
  .add-button {
    @include d-flex(center, center);
    width: 100%;
    gap: $space-xs;
    background-color: $button-ghost-bg;
    color: $button-ghost-text;
    text-transform: uppercase;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    cursor: pointer;
    padding: $space-lg;
    border-radius: $radius-2xl;
    transition: background 0.2s ease;
    margin-right: $space-2xl;

    &:hover {
      background-color: $button-ghost-hover;
    }
  }

  &__button-container {
    @include d-flex(center, center);
    width: 100%;
    margin-bottom: $space-4xl;
  }

  &__content {
    min-height: 50vh;
    width: 100%;
  }
}
</style>
