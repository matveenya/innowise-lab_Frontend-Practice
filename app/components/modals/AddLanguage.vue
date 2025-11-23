<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Add Language</h3>
    </template>

    <template #body>
      <form class="add-language-form" @submit.prevent="onSubmit">
        <Select
          id="language"
          v-model="language"
          label="Language"
          :options="availableLanguages"
          placeholder="Select a language"
        />
        <Select
          id="proficiency"
          v-model="proficiency"
          label="Language Proficiency"
          :options="proficiencyOptions"
          :disabled="!language"
        />
      </form>
    </template>

    <template #footer>
      <Button variant="outline" @click="close">Cancel</Button>
      <Button variant="primary" :disabled="!language || !proficiency" @click="onSubmit"
        >Confirm</Button
      >
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
import Select from '../ui/Select.vue';
import { AVAILABLE_LANGUAGES, PROFICIENCY_VALUES } from '~/constants/languages';
import type { Proficiency } from 'cv-graphql';

const props = defineProps<{
  alreadySelected: string[];
}>();

const isVisible = ref(false);

const availableLanguages = computed(() => {
  if (!props.alreadySelected || props.alreadySelected.length === 0) {
    return [...AVAILABLE_LANGUAGES];
  }

  const selectedSet = new Set(props.alreadySelected);
  return AVAILABLE_LANGUAGES.filter(lang => !selectedSet.has(lang));
});

const language = ref<string | null>(null);
const proficiency = ref<Proficiency | null>(null);

const proficiencyOptions = [...PROFICIENCY_VALUES];

const emit = defineEmits(['add-language']);

const open = () => {
  language.value = null;
  proficiency.value = proficiencyOptions[0] as Proficiency;
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

const onSubmit = () => {
  if (!language.value || !proficiency.value) return;

  try {
    close();
    emit('add-language', { language: language.value, proficiency: proficiency.value });
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
.add-language-form {
  @include d-flex(center, stretch, column);
  gap: $space-2xl;
}
</style>
