<template>
  <div class="cv-preview-skills">
    <div v-for="group in groups" :key="group.category" class="skill-group">
      <h4 class="skill-group__title">{{ group.category }}</h4>
      <p class="skill-group__list">{{ group.items.join(', ') }}.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SkillGroupDisplay {
  category: string;
  items: string[];
}

defineProps<{
  groups: SkillGroupDisplay[];
}>();
</script>

<style lang="scss" scoped>
.cv-preview-skills {
  @include d-flex(flex-start, flex-start, column);
  gap: $space-lg;
  margin-bottom: $space-xl;
}

.skill-group {
  &__title {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-xs;
  }

  &__list {
    font-size: $font-size-md;
    line-height: 1.6;
    color: $color-text-primary;
  }
}
</style>
