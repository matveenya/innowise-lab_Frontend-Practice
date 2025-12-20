<template>
  <div class="cv-preview-skills">
    <div v-for="group in groups" :key="group.category" class="skill-group">
      <h4 class="skill-group__title">{{ group.category }}</h4>
      <p class="skill-group__list">{{ formatItems(group.items) }}.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SkillItem {
  name: string;
}

export interface SkillGroupDisplay {
  category: string;
  items: string[] | SkillItem[];
}

defineProps<{
  groups: SkillGroupDisplay[];
}>();

const formatItems = (items: string[] | SkillItem[]) => {
  return items.map(item => (typeof item === 'string' ? item : item.name)).join(', ');
};
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
