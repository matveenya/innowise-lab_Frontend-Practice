<template>
  <section class="professional-skills">
    <h2 class="section-title">Professional skills</h2>

    <div class="skills-table">
      <div class="skills-table__header">
        <span class="col-skills">SKILLS</span>
        <span class="col-experience">EXPERIENCE<br />IN YEARS</span>
        <span class="col-last-used">LAST USED</span>
      </div>

      <div class="skills-table__body">
        <template v-for="group in groups" :key="group.category">
          <div v-for="skill in group.items" :key="skill.name" class="skills-table__row">
            <span class="cell-category">{{ group.category }}</span>
            <span class="cell-name">{{ skill.name }}</span>
            <span class="cell-experience">{{ skill.experience }}</span>
            <span class="cell-last-used">{{ skill.lastUsed }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface SkillItemDisplay {
  name: string;
  experience: number | string;
  lastUsed: number | string;
}

export interface SkillGroupDisplay {
  category: string;
  items: SkillItemDisplay[];
}

defineProps<{
  groups: SkillGroupDisplay[];
}>();
</script>

<style lang="scss" scoped>
.professional-skills {
  .section-title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-regular;
    margin-bottom: $space-3xl;
    color: $color-text-primary;
  }
}

.skills-table {
  width: 100%;

  &__header {
    @include grid-layout(2fr 2fr 1fr 1fr);
    padding: $space-lg 0;
    @include border-bottom($color-secondary, 1px);
    color: $color-text-primary;
    font-weight: $font-weight-bold;
    font-size: $font-size-sm;
    text-transform: uppercase;

    .col-skills {
      grid-column: 1 / 3;
    }

    .col-experience,
    .col-last-used {
      text-align: center;
    }
  }

  &__body {
    @include d-flex(flex-start, stretch, column);
  }

  &__row {
    @include grid-layout(2fr 2fr 1fr 1fr);
    padding: $space-lg 0;
    @include border-bottom(rgba($color-text-primary, 0.2), 1px);
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .cell-category {
      color: $color-secondary;
      font-size: $font-size-sm;
    }

    .cell-name {
      color: $color-text-primary;
      font-size: $font-size-sm;
    }

    .cell-experience,
    .cell-last-used {
      text-align: center;
      color: $color-text-primary;
      font-size: $font-size-sm;
    }
  }
}
</style>
