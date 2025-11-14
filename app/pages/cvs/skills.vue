<template>
  <div class="cv-skills">
    <div class="cv-skills__button-container">
      <Button variant="ghost" class="add-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        ADD SKILL
      </Button>
    </div>

    <div class="cv-skills__content"></div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
definePageMeta({
  layout: 'cv-details',
});
</script>

<style lang="scss" scoped>
.cv-skills {
  .add-button {
    width: 100%;
    margin-right: $space-2xl;
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
