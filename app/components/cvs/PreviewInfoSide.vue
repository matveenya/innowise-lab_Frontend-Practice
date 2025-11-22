<template>
  <aside class="cv-preview-sidebar">
    <section v-if="education" class="info-block">
      <h3 class="info-title">Education</h3>
      <p class="info-text">{{ education }}</p>
    </section>

    <section v-else class="info-block">
      <h3 class="info-title">Education</h3>
      <p class="info-text">No education</p>
    </section>

    <section class="info-block">
      <h3 class="info-title">Language proficiency</h3>
    </section>

    <section class="info-block">
      <h3 class="info-title">Domains</h3>
      <p class="info-text">{{ domains }}</p>
    </section>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  education?: string | null;
  domains: string;
}>();
</script>

<style lang="scss" scoped>
.cv-preview-sidebar {
  .info-block {
    margin-bottom: $space-2xl;

    .info-title {
      font-size: $font-size-md;
      font-weight: $font-weight-bold;
      margin-bottom: $space-xs;
      color: $color-text-primary;
    }

    .info-text {
      font-size: $font-size-md;
      line-height: 1.6;
      color: $color-text-primary;
    }
  }
}
</style>
