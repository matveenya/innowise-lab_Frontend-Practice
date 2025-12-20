<template>
  <div class="cv-skills-page">
    <div class="cv-skills">
      <div class="cv-skills__content">
        <div v-if="groupedSelectedSkills.length > 0" class="cv-skills__list">
          <div
            v-for="group in groupedSelectedSkills"
            :key="group.label"
            class="cv-skills__list-group"
          >
            <p class="cv-skills__list-title">{{ group.label }}</p>
            <div class="cv-skills__list-items">
              <SkillProgressBar
                v-for="skill in group.items"
                :key="skill.id"
                :level="skillLevels[skill.name] || 'Novice'"
                :skill-label="skill.name"
                :is-delete-mode="isDeleteMode"
                :is-selected="skillsToDelete.includes(skill.name)"
                @click="handleSkillClick(skill)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="cv-skills__actions"
        :class="{ 'cv-skills__actions--centered': selectedSkills.length === 0 }"
      >
        <Button v-if="isDeleteMode" variant="outline" @click="cancelDeleteMode"> Cancel </Button>

        <Button
          v-else
          variant="ghost"
          class="cv-skills__actions-add-skill"
          @click="openAddSkillModal"
        >
          <Icon name="material-symbols:add-2-rounded" size="1.5rem" />Add Skill
        </Button>

        <Button
          v-if="isDeleteMode"
          variant="primary"
          :disabled="skillsToDelete.length === 0"
          class="btn-delete-confirm"
          @click="deleteSelectedSkills"
        >
          Delete
          <span v-if="skillsToDelete.length > 0" class="badge-count">
            {{ skillsToDelete.length }}
          </span>
        </Button>

        <Button
          v-else-if="selectedSkills.length > 0"
          variant="ghost"
          class="cv-skills__actions-remove-skill"
          @click="isDeleteMode = true"
        >
          <Icon name="material-symbols:delete-forever" size="1.5rem" />Remove skill
        </Button>
      </div>

      <ModalAddSkill
        ref="modalAddSkill"
        :already-selected="selectedSkills"
        @add-skill="handleAddSkill"
      />
      <ModalUpdateSkill ref="modalUpdateSkill" @update-skill="handleUpdateSkill" />
      <AppToast />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import AppToast from '~/components/ui/AppToast.vue';
import Button from '~/components/ui/Button.vue';
import SkillProgressBar from '~/components/skill/ProgressBar.vue';
import { useReferencesStore } from '~/stores/references';
import ModalAddSkill from '~/components/modals/AddSkill.vue';
import ModalUpdateSkill from '~/components/modals/UpdateSkill.vue';
import type { Skill } from '~/graphql/types';
import { groupSkillsByCategory, type SkillGroup } from '~/utils/skillUtils';
import { useCv } from '~/composables/useCv';
import { addCvSkill, deleteCvSkill, updateCvSkill } from '~/services/cvs';
import type { Mastery } from '~/constants/skills';
import type { AddCvSkillInput } from '~/graphql/types/cv';

definePageMeta({
  layout: 'cv-details',
});

const referencesStore = useReferencesStore();
const toast = useToast();
const { cv, refetch } = useCv();

const modalAddSkill = ref<InstanceType<typeof ModalAddSkill> | null>(null);
const modalUpdateSkill = ref<InstanceType<typeof ModalUpdateSkill> | null>(null);

const selectedSkills = ref<Skill[]>([]);
const skillLevels = ref<Record<string, Mastery>>({});

const isDeleteMode = ref(false);
const skillsToDelete = ref<string[]>([]);

const groupedSelectedSkills = computed<SkillGroup[]>(() => {
  return groupSkillsByCategory(selectedSkills.value);
});

const mapCvSkills = () => {
  if (cv.value?.skills) {
    const mappedSkills: Skill[] = [];
    const levels: Record<string, Mastery> = {};

    cv.value.skills.forEach(
      (cvSkill: { name: string; mastery: string | Mastery; category?: string }) => {
        const refSkill = referencesStore.skills.find(s => s.name === cvSkill.name);

        if (refSkill) {
          mappedSkills.push(refSkill);
          levels[refSkill.name] = cvSkill.mastery as Mastery;
        } else {
          mappedSkills.push({
            id: cvSkill.name,
            name: cvSkill.name,
            category: {
              id: 'other',
              name: 'Other',
            },
          } as Skill);
          levels[cvSkill.name] = cvSkill.mastery as Mastery;
        }
      }
    );

    selectedSkills.value = mappedSkills;
    skillLevels.value = levels;
  }
};

watch(() => cv.value, mapCvSkills, { immediate: true, deep: true });

onMounted(async () => {
  await referencesStore.loadReferences();
  mapCvSkills();
});

const openAddSkillModal = () => {
  modalAddSkill.value?.open();
};

const handleAddSkill = async (payload: { skill: Skill; mastery: Mastery }) => {
  if (!payload.skill || !payload.mastery || !cv.value?.id) return;

  try {
    const input: AddCvSkillInput = {
      cvId: cv.value.id,
      name: payload.skill.name,
      categoryId: payload.skill.category?.id,
      mastery: payload.mastery,
    };

    await addCvSkill(input);
    await refetch();

    toast.add({ severity: 'success', summary: 'Skill added', life: 3000 });
  } catch (error) {
    console.error('Failed to add skill', error);
    toast.add({ severity: 'error', summary: 'Failed to add skill', life: 3000 });
  }
};

const handleUpdateSkill = async (payload: { skill: Skill; mastery: Mastery }) => {
  if (!payload.skill || !payload.mastery || !cv.value?.id) return;

  try {
    await updateCvSkill({
      cvId: cv.value.id,
      name: payload.skill.name,
      categoryId: payload.skill.category?.id,
      mastery: payload.mastery,
    });

    await refetch();
    toast.add({ severity: 'success', summary: 'Skill updated', life: 3000 });
  } catch (error) {
    console.error('Failed to update skill', error);
    toast.add({ severity: 'error', summary: 'Failed to update skill', life: 3000 });
  }
};

const cancelDeleteMode = () => {
  isDeleteMode.value = false;
  skillsToDelete.value = [];
};

const handleSkillClick = (skill: Skill) => {
  if (isDeleteMode.value) {
    if (skillsToDelete.value.includes(skill.name)) {
      skillsToDelete.value = skillsToDelete.value.filter(name => name !== skill.name);
    } else {
      skillsToDelete.value.push(skill.name);
    }
  } else {
    const currentMastery = skillLevels.value[skill.name];
    if (currentMastery) {
      modalUpdateSkill.value?.open(skill, currentMastery);
    }
  }
};

const deleteSelectedSkills = async () => {
  if (!cv.value?.id) return;
  try {
    if (skillsToDelete.value.length > 0) {
      await deleteCvSkill({
        cvId: cv.value.id,
        name: skillsToDelete.value,
      });
      await refetch();
      toast.add({ severity: 'success', summary: 'Skills removed', life: 3000 });
    }
    cancelDeleteMode();
  } catch (error) {
    console.error('Failed to delete skills', error);
    toast.add({ severity: 'error', summary: 'Failed to delete skills', life: 3000 });
  }
};
</script>

<style scoped lang="scss">
.cv-skills-page {
  padding-top: $space-lg;
  width: 100%;
}

.cv-skills {
  width: 100%;
  max-width: $cv-details-width;
  margin-inline: auto;
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
    width: 100%;

    &-group {
      @include d-flex(space-between, flex-start, column);
      gap: $space-lg;
      width: 100%;
    }

    &-title {
      color: $color-text-primary;
      line-height: 1.5;
      font-weight: $font-weight-bold;
    }

    &-items {
      @include grid-layout(repeat(3, 1fr), auto);
      gap: $space-lg;
      width: 100%;
    }
  }

  &__actions {
    width: 100%;
    @include d-flex(flex-end, center, row);
    gap: $space-2xl;
    margin-top: $space-xl;

    button {
      display: inline-flex;
      align-items: center;
      gap: $space-lg;
      height: 3rem;
      padding: $space-xl $space-md;
    }

    &-remove-skill {
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
