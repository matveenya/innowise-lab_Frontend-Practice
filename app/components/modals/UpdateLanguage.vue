<template>
  <ModalsBaseModal v-model:is-visible="isVisible">
    <template #header>
      <h3 class="modal__title">Update Language</h3>
    </template>

    <template #body>
      <form class="update-language-form" @submit.prevent="onSubmit">
        <Select
          id="language"
          v-model="language"
          label="Language"
          :options="[language]"
          :disabled="true"
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
      <Button variant="primary" :disabled="!isChanged" @click="onSubmit">Confirm</Button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
import Select from '../ui/Select.vue';
import { PROFICIENCY_VALUES } from '~/constants/languages';
import type { Proficiency } from 'cv-graphql';

const isVisible = ref(false);

const language = ref<string | null>(null);
const proficiency = ref<Proficiency | null>(null);
const originalProficiency = ref<Proficiency | null>(null);

const proficiencyOptions = [...PROFICIENCY_VALUES];

const isChanged = computed(() => {
  return proficiency.value !== originalProficiency.value;
});

const emit = defineEmits(['update-language']);

const open = (targetLanguage: string, currentProficiency: Proficiency) => {
  language.value = targetLanguage;
  proficiency.value = currentProficiency;
  originalProficiency.value = currentProficiency;
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

const onSubmit = () => {
  if (!language.value || !proficiency.value) return;

  try {
    emit('update-language', { language: language.value, proficiency: proficiency.value });
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
.update-language-form {
  @include d-flex(center, stretch, column);
  gap: $space-2xl;
}
</style>
