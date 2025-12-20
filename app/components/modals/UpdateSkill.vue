<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Update Skill</h3>
    </template>

    <template #body>
      <form class="add-skill-form" @submit.prevent="onSubmit">
        <SkillSelect
          id="skill"
          v-model="skill"
          label="Skill"
          :options="groupedSkills"
          option-label="name"
          option-group-label="label"
          option-group-children="items"
          :disabled="true"
        />
        <Select
          id="mastery"
          v-model="mastery"
          label="Skill mastery"
          :options="masteryOptions"
          :disabled="!skill"
        />
      </form>
    </template>

    <template #footer>
      <Button variant="outline" @click="close">Cancel</Button>
      <Button variant="primary" :disabled="!isChanged" @click="onSubmit">Confirm</Button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
import SkillSelect from '../skill/Select.vue';
import Select from '../ui/Select.vue';
import { useReferencesStore } from '~/stores/references';
import type { Skill } from '~/graphql/types';
import { MASTERY_VALUES, type Mastery } from '~/constants/skills';
import { groupSkillsByCategory, type SkillGroup } from '~/utils/skillUtils';

const isVisible = ref(false);
const referencesStore = useReferencesStore();

const skill = ref<Skill | null>(null);
const mastery = ref<Mastery | null>(null);
const originalMastery = ref<Mastery | null>(null);

const masteryOptions = [...MASTERY_VALUES];

const groupedSkills = computed<SkillGroup[]>(() => {
  return groupSkillsByCategory(referencesStore.skills);
});

const isChanged = computed(() => {
  return mastery.value !== originalMastery.value;
});

const emit = defineEmits(['update-skill']);

const open = async (targetSkill: Skill, currentMastery: Mastery) => {
  try {
    await referencesStore.loadReferences();

    skill.value = targetSkill;
    mastery.value = currentMastery;
    originalMastery.value = currentMastery;

    isVisible.value = true;
  } catch (error) {
    console.error('Failed to load dependencies for skill update', error);
  }
};

const close = () => {
  isVisible.value = false;
};

const onSubmit = () => {
  if (!skill.value || !mastery.value) return;

  try {
    emit('update-skill', { skill: skill.value, mastery: mastery.value });
    close();
  } catch (error) {
    console.error(error);
  }
};

defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.add-skill-form {
  @include d-flex(center, stretch, column);
  gap: $space-2xl;
}
</style>
