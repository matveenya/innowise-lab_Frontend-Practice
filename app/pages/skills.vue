<template>
  <section class="skills-page">
    <h2 class="page-title">Skills</h2>

    <div class="skills-page__button-container">
      <Button variant="ghost" class="add-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD SKILL
      </Button>
    </div>

    <div class="skills-page__content"></div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
</script>

<style scoped lang="scss">
.skills-page {
  padding-top: $space-lg;
  padding-inline: $space-2xl;

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
      width: 100%;
    }
  }

  &__content {
    min-height: 50vh;
    width: 100%;
  }
}
</style>
