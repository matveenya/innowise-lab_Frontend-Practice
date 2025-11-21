<template>
  <header class="cv-preview-header">
    <div class="cv-preview-header__identity">
      <h1 v-if="userName" class="cv-preview-header__user-name">{{ userName }}</h1>
      <p v-if="userPosition" class="cv-preview-header__user-position">{{ userPosition }}</p>
    </div>

    <div class="cv-preview-header__controls">
      <div class="language-select-wrapper">
        <Select
          v-model="selectedLanguage"
          label="Language"
          :options="languages"
          class="language-select"
        />
      </div>

      <Button variant="outline" class="export-btn"> EXPORT PDF </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '~/graphql/types';
import Button from '~/components/ui/Button.vue';
import Select from '~/components/ui/Select.vue';

const props = defineProps<{
  user?: User | null;
}>();

const selectedLanguage = ref('English');
const languages = ['English', 'Deutsch', 'Русский'];

const userName = computed(() => {
  const profile = props.user?.profile;
  if (profile?.first_name && profile?.last_name) {
    return `${profile.first_name} ${profile.last_name}`;
  }
  return '';
});

type UserWithPosition = {
  position_name?: string;
};

const userPosition = computed(() => {
  const user = props.user as unknown as UserWithPosition | undefined;
  return user?.position_name;
});
</script>

<style lang="scss" scoped>
.cv-preview-header {
  @include d-flex(space-between, center);
  margin-bottom: $space-5xl;
  padding-bottom: $space-xl;

  &__identity {
    @include d-flex(flex-start, flex-start, column);
    gap: $space-xs;
  }

  &__user-name {
    font-size: $font-size-5xl;
    font-weight: $font-weight-regular;
    line-height: 1.2;
    color: $color-text-primary;
  }

  &__user-position {
    font-size: $font-size-xl;
    color: $color-text-primary;
    margin-top: $space-xs;
  }

  &__controls {
    @include d-flex(flex-end, center);
    gap: $space-xl;

    .language-select-wrapper {
      width: $button-width-sm;
    }

    .language-select {
      .select__field {
        background-color: transparent;
        border-color: $color-border-subtle;
      }
      .select__label {
        color: $color-text-primary;
      }
      .select__value {
        color: $color-text-primary;
      }
    }

    .export-btn {
      background-color: transparent;
      border: $border-thin-1 $color-secondary;
      color: $color-secondary;
      min-width: $button-width-sm;
      padding: $space-md;

      &:hover {
        background-color: rgba($color-secondary, 0.1);
        --border-color: #{$color-secondary};
      }
    }
  }
}
</style>
