<template>
  <div class="profile-skills">
    <div class="profile-skills__content">
      <div v-if="groupedSelectedSkills.length > 0" class="profile-skills__list">
        <div
          v-for="group in groupedSelectedSkills"
          :key="group.label"
          class="profile-skills__list-group"
        >
          <p class="profile-skills__list-title">{{ group.label }}</p>
          <div class="profile-skills__list-items">
            <SkillProgressBar
              v-for="skill in group.items"
              :key="skill.id"
              :level="skillLevels[skill.id] || 'Novice'"
              :skill-label="skill.name"
              :is-delete-mode="isDeleteMode"
              :is-selected="skillsToDelete.includes(skill.id)"
              @click="toggleSkillDeletion(skill.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="profile-skills__actions">
      <Button v-if="isDeleteMode" variant="outline" @click="cancelDeleteMode"> Cancel </Button>

      <Button
        v-else
        variant="ghost"
        class="profile-skills__actions-add-skill"
        @click="openAddSkillModal"
        ><Icon name="material-symbols:add-2-rounded" size="1.5rem" />Add Skill</Button
      >

      <Button
        v-if="isDeleteMode"
        variant="primary"
        :disabled="skillsToDelete.length === 0"
        class="btn-delete-confirm"
        @click="deleteSelectedSkills"
        >Delete
        <span v-if="skillsToDelete.length > 0" class="badge-count">
          {{ skillsToDelete.length }}
        </span>
      </Button>

      <Button
        v-else-if="selectedSkills.length > 0"
        variant="ghost"
        class="profile-skills__actions-remove-skill"
        @click="isDeleteMode = true"
        ><Icon name="material-symbols:delete-forever" size="1.5rem" />Remove skill</Button
      >
    </div>
    <ModalAddSkill
      ref="modalAddSkill"
      :already-selected="selectedSkills"
      @add-skill="handleAddSkill"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import SkillProgressBar from '~/components/skill/ProgressBar.vue';
import { useReferencesStore } from '~/stores/references';
import ModalAddSkill from '~/components/modals/AddSkill.vue';
import type { Mastery } from '~/constants/skills';
import type { Skill } from '~/graphql/types';
import { groupSkillsByCategory, type SkillGroup } from '~/utils/skillUtils';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const referencesStore = useReferencesStore();
const modalAddSkill = ref<InstanceType<typeof ModalAddSkill> | null>(null);

const selectedSkills = ref<Skill[]>([]);
const skillLevels = ref<Record<string, Mastery>>({});

const isDeleteMode = ref(false);
const skillsToDelete = ref<string[]>([]);

const groupedSelectedSkills = computed<SkillGroup[]>(() => {
  return groupSkillsByCategory(selectedSkills.value);
});

onMounted(async () => {
  await referencesStore.loadReferences();
});

const openAddSkillModal = () => {
  modalAddSkill.value?.open();
};

const handleAddSkill = (payload: { skill: Skill; mastery: Mastery }) => {
  if (!payload.skill || !payload.mastery) return;

  selectedSkills.value.push(payload.skill);
  skillLevels.value[payload.skill.id] = payload.mastery;
};

const cancelDeleteMode = () => {
  isDeleteMode.value = false;
  skillsToDelete.value = [];
};

const toggleSkillDeletion = (skillId: string) => {
  if (!isDeleteMode.value) return;

  if (skillsToDelete.value.includes(skillId)) {
    skillsToDelete.value = skillsToDelete.value.filter(id => id !== skillId);
  } else {
    skillsToDelete.value.push(skillId);
  }
};

const deleteSelectedSkills = () => {
  selectedSkills.value = selectedSkills.value.filter(
    skill => !skillsToDelete.value.includes(skill.id)
  );

  cancelDeleteMode();
};
</script>

<style scoped lang="scss">
.profile-skills {
  width: 100%;
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
    &-group {
      @include d-flex(space-between, flex-start, column);
      gap: $space-lg;
    }
    &-title {
      color: $color-text-primary;
      line-height: 1.5;
    }
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

    &-remove-skill {
      color: $color-secondary;
      &:hover {
        background-color: rgba($color-secondary, 0.08);
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
