<template>
  <section class="languages-page">
    <h2 class="page-title">Languages</h2>

    <div class="languages-page__button-container">
      <button class="add-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD LANGUAGE
      </button>
    </div>

    <div class="languages-page__content"></div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.languages-page {
  padding-top: $space-lg;

  .page-title {
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $color-text-muted;
    margin-bottom: $space-lg;
  }

  &__button-container {
    @include d-flex(center, center);
    width: 100%;
    margin-bottom: $space-4xl;

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

      &:hover {
        background-color: $button-ghost-hover;
      }
    }
  }

  &__content {
    min-height: 50vh;
    width: 100%;
  }
}
</style>
