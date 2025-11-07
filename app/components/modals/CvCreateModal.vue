<template>
  <ModalsBaseModal :is-visible="isVisible" @update:is-visible="emit('update:isVisible', $event)">
    <template #header>
      <h3 class="modal__title">Create CV</h3>
    </template>

    <template #body>
      <Input id="name" v-model="name" label="Name" />
      <Input id="education" v-model="education" label="Education" />
      <Textarea id="description" v-model="description" label="Description" />
    </template>

    <template #footer>
      <button class="button button--cancel" @click="closeModal">Cancel</button>
      <button class="button button--create" @click="createCv">Create</button>
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import Textarea from '../ui/Textarea.vue';
defineProps<{ isVisible: boolean }>();
const emit = defineEmits(['update:isVisible']);

const name = ref('');
const education = ref('');
const description = ref('');

const closeModal = () => emit('update:isVisible', false);
const createCv = () => closeModal();
</script>

<style scoped lang="scss">
.modal {
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    margin: 0;
  }
}

.button {
  padding: $space-md $space-6xl;
  border-radius: $radius-2xl;
  font-weight: $font-weight-medium;
  cursor: pointer;
  font-size: $font-size-md;
  border: none;

  &--cancel {
    background-color: $button-outline-bg;
    color: $button-outline-text;
    border: $border-outline;

    &:hover {
      background-color: $button-outline-hover;
      border: $border-outline-hover;
    }
  }

  &--create {
    background-color: $button-neutral-bg;
    color: $color-text-primary-disabled;

    &:hover {
      background-color: $button-neutral-hover;
      color: $color-text-primary;
    }
  }
}
</style>
