<template>
  <div class="skills-container">
    <SkillProgressBar level="novice" />
    <SkillProgressBar level="advanced" />
    <SkillProgressBar level="competent" />
    <SkillProgressBar level="proficient" />
    <SkillProgressBar level="expert" />

    <SkillSelect
      v-model="selectedSkillId"
      label="Skill"
      :options="groupedSkills"
      option-label="name"
      option-value="id"
      option-group-label="label"
      option-group-children="items"
    />
  </div>
</template>

<script setup lang="ts">
import SkillProgressBar from '~/components/skill/ProgressBar.vue';
import SkillSelect from '~/components/skill/Select.vue';
import { getSkills } from '~/services/skills';
import type { Skill } from '~/graphql/types';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

type SkillGroup = {
  label: string;
  items: Skill[];
};

const skills = ref<Skill[]>([]);

onMounted(async () => {
  skills.value = await getSkills();
});

const selectedSkillId = ref<string | null>(null);

const groupedSkills = computed<SkillGroup[]>(() => {
  const groups: Record<string, SkillGroup> = {};

  skills.value.forEach((skill: Skill) => {
    const groupName = skill.category_name || 'Other';

    if (!groups[groupName]) {
      groups[groupName] = {
        label: groupName,
        items: [],
      };
    }

    groups[groupName].items.push(skill);
  });
  return Object.values(groups);
});
</script>

<style scoped lang="scss">
.skills-container {
  padding-inline: $space-2xl;
  @include grid-layout(repeat(2, 1fr));
}
</style>
