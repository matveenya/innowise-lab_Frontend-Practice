<template>
  <section class="cv-details__content">
    <form class="cv-form">
      <Input id="cv-name" v-model="name" label="Name" />
      <Input id="cv-education" v-model="education" label="Education" />
      <Textarea id="cv-description" v-model="description" label="Description" />

      <div class="cv-form__actions">
        <button type="submit" class="cv-form__button">Update</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import Textarea from '~/components/ui/Textarea.vue';
const name = ref('');
const education = ref('');
const description = ref('');

definePageMeta({
  layout: 'cv-details',
});
</script>

<style lang="scss" scoped>
.cv-details {
  &__content {
    @include container($cv-details-width);
  }
}

.cv-form {
  @include d-flex(flex-start, stretch, column);
  gap: $space-3xl;

  &__actions {
    @include d-flex(flex-end, center);
  }

  &__button {
    width: $button-width-details;
    background-color: $button-primary-bg;
    color: $button-primary-text;
    border: none;
    border-radius: $radius-2xl;
    box-shadow: $shadow-md;
    padding: $space-lg;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $button-primary-hover;
    }
  }
}
</style>
