<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Add Skill</h3>
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
      <Button variant="primary" :disabled="!skill || !mastery" @click="onSubmit">Confirm</Button>
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
import { addSkillSchema, type AddSkillSchemaType } from '~/utils/schemas/skillSchema';

const props = defineProps<{
  alreadySelected: Skill[];
}>();

const isVisible = ref(false);
const referencesStore = useReferencesStore();

const groupedSkills = computed<SkillGroup[]>(() => {
  const allGroups = groupSkillsByCategory(referencesStore.skills);

  if (!props.alreadySelected || props.alreadySelected.length === 0) {
    return allGroups;
  }

  const selectedIds = new Set(props.alreadySelected.map(skill => skill.id));

  const filteredGroups = allGroups.map(group => ({
    ...group,
    items: group.items.filter(skill => !selectedIds.has(skill.id)),
  }));

  return filteredGroups.filter(group => group.items.length > 0);
});

const skill = ref<Skill | null>(null);
const mastery = ref<Mastery | null>(null);

const masteryOptions = [...MASTERY_VALUES];

const { handleSubmit } = useForm<AddSkillSchemaType>({
  validationSchema: toTypedSchema(addSkillSchema),
  initialValues: {
    skill: {
      id: '',
      category_name: '',
    },
    mastery: 'Novice',
  },
});

const emit = defineEmits(['add-skill']);

const open = async () => {
  try {
    await referencesStore.loadReferences();

    skill.value = null;
    mastery.value = masteryOptions[0] as Mastery;

    isVisible.value = true;
  } catch (error) {
    console.error('Failed to load dependencies for user update', error);
  }
};

const close = () => {
  isVisible.value = false;
};

const onSubmit = handleSubmit(async () => {
  if (!skill.value || !mastery.value) return;

  try {
    close();
    emit('add-skill', { skill: skill.value, mastery: mastery.value });
  } catch (error) {
    console.error(error);
  }
});

defineExpose({
  open,
  close,
});

watch(skill, newSkill => {
  if (newSkill) {
    mastery.value = masteryOptions[0] as Mastery;
  } else {
    mastery.value = null;
  }
});
</script>

<style scoped lang="scss">
.add-skill-form {
  @include d-flex(center, stretch, column);
  gap: $space-2xl;
}
</style>
