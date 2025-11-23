<template>
  <div class="profile-languages">
    <div class="profile-languages__content">
      <div v-if="selectedLanguages.length > 0" class="profile-languages__list">
        <div class="profile-languages__list-items">
          <LanguageBadge
            v-for="lang in selectedLanguages"
            :key="lang"
            :proficiency="languageProficiency[lang] || ('A1' as ProficiencyType)"
            :language-label="lang"
            :is-delete-mode="isDeleteMode"
            :is-selected="languagesToDelete.includes(lang)"
            :is-editable="isMyProfile"
            @click="handleLanguageClick(lang)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isMyProfile"
      class="profile-languages__actions"
      :class="{ 'profile-languages__actions--centered': selectedLanguages.length === 0 }"
    >
      <Button v-if="isDeleteMode" variant="outline" @click="cancelDeleteMode"> Cancel </Button>

      <Button
        v-else
        variant="ghost"
        class="profile-languages__actions-add-language"
        @click="openAddLanguageModal"
        ><Icon name="material-symbols:add-2-rounded" size="1.5rem" />Add Language</Button
      >

      <Button
        v-if="isDeleteMode"
        variant="primary"
        :disabled="languagesToDelete.length === 0"
        class="btn-delete-confirm"
        @click="deleteSelectedLanguages"
        >Delete
        <span v-if="languagesToDelete.length > 0" class="badge-count">
          {{ languagesToDelete.length }}
        </span>
      </Button>

      <Button
        v-else-if="selectedLanguages.length > 0"
        variant="ghost"
        class="profile-languages__actions-remove-language"
        @click="isDeleteMode = true"
        ><Icon name="material-symbols:delete-forever" size="1.5rem" />Remove Languages</Button
      >
    </div>
    <ModalAddLanguage
      ref="modalAddLanguage"
      :already-selected="selectedLanguages"
      @add-language="handleAddLanguage"
    />
    <ModalUpdateLanguage ref="modalUpdateLanguage" @update-language="handleUpdateLanguage" />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'primevue/usetoast';
import AppToast from '~/components/ui/AppToast.vue';
import Button from '~/components/ui/Button.vue';
import LanguageBadge from '~/components/language/Badge.vue';
import ModalAddLanguage from '~/components/modals/AddLanguage.vue';
import ModalUpdateLanguage from '~/components/modals/UpdateLanguage.vue';
import type { Proficiency } from 'cv-graphql';
import type { Proficiency as ProficiencyType } from '~/constants/languages';
import {
  getUserProfile,
  addProfileLanguage,
  deleteProfileLanguage,
  updateProfileLanguage,
} from '~/services/users';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();
const modalAddLanguage = ref<InstanceType<typeof ModalAddLanguage> | null>(null);
const modalUpdateLanguage = ref<InstanceType<typeof ModalUpdateLanguage> | null>(null);

const selectedLanguages = ref<string[]>([]);
const languageProficiency = ref<Record<string, ProficiencyType>>({});

const isDeleteMode = ref(false);
const languagesToDelete = ref<string[]>([]);

const isMyProfile = computed(() => {
  return authStore.user?.id === route.params.id;
});

const fetchUserProfile = async () => {
  try {
    const userProfile = await getUserProfile({ id: route.params.id as string });

    if (userProfile?.languages) {
      const languages: string[] = [];
      userProfile.languages.forEach(userLang => {
        languages.push(userLang.name);
        if (userLang.proficiency) {
          languageProficiency.value[userLang.name] = userLang.proficiency as ProficiencyType;
        }
      });
      selectedLanguages.value = languages;
    }
  } catch (error) {
    console.error('Failed to load user languages', error);
  }
};

onMounted(async () => {
  await fetchUserProfile();
});

const openAddLanguageModal = () => {
  modalAddLanguage.value?.open();
};

const handleAddLanguage = async (payload: { language: string; proficiency: ProficiencyType }) => {
  if (!payload.language || !payload.proficiency) return;

  try {
    await addProfileLanguage({
      language: {
        userId: route.params.id as string,
        name: payload.language,
        proficiency: payload.proficiency as Proficiency,
      },
    });

    selectedLanguages.value.push(payload.language);
    languageProficiency.value[payload.language] = payload.proficiency;
    toast.add({
      severity: 'success',
      summary: 'Language was added',
      life: 3000,
    });
  } catch (error) {
    console.error('Failed to add language', error);
    toast.add({
      severity: 'error',
      summary: 'Failed to add language',
      life: 3000,
    });
  }
};

const handleUpdateLanguage = async (payload: {
  language: string;
  proficiency: ProficiencyType;
}) => {
  if (!payload.language || !payload.proficiency) return;

  try {
    await updateProfileLanguage({
      language: {
        userId: route.params.id as string,
        name: payload.language,
        proficiency: payload.proficiency as Proficiency,
      },
    });

    languageProficiency.value[payload.language] = payload.proficiency;
    toast.add({
      severity: 'success',
      summary: 'Language was updated',
      life: 3000,
    });
  } catch (error) {
    console.error('Failed to update language', error);
    toast.add({
      severity: 'error',
      summary: 'Failed to update language',
      life: 3000,
    });
  }
};

const cancelDeleteMode = () => {
  isDeleteMode.value = false;
  languagesToDelete.value = [];
};

const toggleLanguageDeletion = (language: string) => {
  if (languagesToDelete.value.includes(language)) {
    languagesToDelete.value = languagesToDelete.value.filter(lang => lang !== language);
  } else {
    languagesToDelete.value.push(language);
  }
};

const handleLanguageClick = (language: string) => {
  if (!isMyProfile.value) return;

  if (isDeleteMode.value) {
    toggleLanguageDeletion(language);
  } else {
    const currentProficiency = languageProficiency.value[language];
    if (currentProficiency) {
      modalUpdateLanguage.value?.open(language, currentProficiency);
    }
  }
};

const deleteSelectedLanguages = async () => {
  try {
    if (languagesToDelete.value.length > 0) {
      await deleteProfileLanguage({
        language: {
          userId: route.params.id as string,
          name: languagesToDelete.value,
        },
      });

      selectedLanguages.value = selectedLanguages.value.filter(
        lang => !languagesToDelete.value.includes(lang)
      );

      toast.add({
        severity: 'success',
        summary: 'Languages were removed',
        life: 3000,
      });
    }

    cancelDeleteMode();
  } catch (error) {
    console.error('Failed to delete languages', error);
    toast.add({
      severity: 'error',
      summary: 'Failed to delete languages',
      life: 3000,
    });
  }
};
</script>

<style scoped lang="scss">
.profile-languages {
  width: 100%;
  max-width: $cv-details-width;
  margin-inline: auto;
  padding-inline: $space-2xl;
  @include d-flex(space-between, center, column);
  gap: $space-lg;
  &__content {
    width: 100%;
    flex-grow: 1;
    @include d-flex(space-between, flex-start, column);
    gap: $space-3xl;
  }
  &__list {
    @include d-flex(space-between, flex-start, column);
    gap: $space-3xl;
    &-items {
      @include grid-layout(repeat(3, 1fr), auto);
      gap: $space-lg;
    }
  }
  &__actions {
    width: 100%;
    @include d-flex(flex-end, center, row);
    gap: $space-2xl;

    button {
      display: inline-flex;
      align-items: center;
      gap: $space-lg;
      height: 3rem;
      padding: $space-xl $space-md;
    }

    &-remove-language {
      color: $color-secondary;
      &:hover {
        background-color: rgba($color-secondary, 0.08);
      }
    }

    &--centered {
      justify-content: center;

      button {
        min-width: $button-width-details;
      }
    }
  }
}

.badge-count {
  background-color: $color-text-primary;
  border-radius: $radius-rounded;
  width: $space-xl;
  height: $space-xl;
  @include d-flex(center, center);
  color: $color-primary;
  font-weight: $font-weight-bold;
  font-size: $font-size-sm;
}
</style>
