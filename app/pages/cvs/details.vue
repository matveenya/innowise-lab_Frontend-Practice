<template>
  <main class="cv-details">
    <nav class="breadcrumb">
      <NuxtLink to="/cvs" class="breadcrumb__link">CVs</NuxtLink>
      <span class="breadcrumb__separator">›</span>
      <span class="breadcrumb__current">Cv Name</span>
    </nav>

    <nav class="tabs">
      <ul class="tabs__list">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          class="tabs__item"
          :class="{ 'tabs__item--active': currentTab === tab.name }"
        >
          <NuxtLink :to="tab.to" class="tabs__link">
            {{ tab.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <section class="cv-details__content">
      <form class="cv-form">
        <div class="cv-form__group">
          <input id="cv-name" type="text" class="cv-form__input" placeholder=" " />
          <label for="cv-name" class="cv-form__label">Name</label>
        </div>

        <div class="cv-form__group">
          <input id="cv-education" type="text" class="cv-form__input" placeholder=" " />
          <label for="cv-education" class="cv-form__label">Education</label>
        </div>

        <div class="cv-form__group">
          <textarea
            id="cv-description"
            rows="8"
            class="cv-form__textarea"
            placeholder=" "
          ></textarea>
          <label for="cv-description" class="cv-form__label">Description</label>
        </div>

        <div class="cv-form__actions">
          <button type="submit" class="cv-form__button">Update</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const tabs = [
  { name: 'DETAILS', to: '/cvs/details' },
  { name: 'SKILLS', to: '/cvs/skills' },
  { name: 'PROJECTS', to: '/cvs/projects' },
  { name: 'PREVIEW', to: '/cvs/preview' },
];

const currentTab = computed(() => {
  const currentPath = route.path.toLowerCase();
  const tab = tabs.find(t => currentPath.includes(t.name.toLowerCase()));
  return tab ? tab.name : 'DETAILS';
});
</script>

<style lang="scss" scoped>
.cv-details {
  background-color: $color-primary;
  color: $color-text-primary;
  padding: $space-lg;

  .breadcrumb {
    @include d-flex(flex-start, center);
    gap: $space-md;
    margin-bottom: $space-xs;
    font-size: $font-size-md;
    color: $color-text-muted;

    &__link {
      color: $color-text-secondary;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    &__separator {
      color: $color-text-muted;
      font-size: $font-size-2xl;
    }

    &__current {
      color: $color-secondary-hover;
      font-weight: $font-weight-medium;
    }
  }

  .tabs {
    margin-bottom: $space-2xl;
    font-size: $font-size-sm;

    &__list {
      @include d-flex(flex-start, center);
      gap: $space-lg;
    }

    &__item {
      &--active .tabs__link {
        color: $color-secondary;
        @include border-bottom($color-secondary);
      }
    }

    &__link {
      display: inline-block;
      padding: $space-lg $space-4xl;
      text-transform: uppercase;
      font-weight: $font-weight-medium;
      color: $color-text-primary;
      @include border-bottom(transparent);
      transition: all 0.3s ease;

      &:active {
        background-color: rgba($color-secondary, 0.1);
      }
    }
  }

  .cv-details__content {
    @include container($cv-details-width);
  }

  .cv-form {
    @include d-flex(flex-start, stretch, column);
    gap: $space-3xl;

    &__group {
      position: relative;
    }

    &__input,
    &__textarea {
      width: 100%;
      background-color: $color-primary;
      border: $border-subtle;
      padding: $space-md;
      color: $color-text-primary;
      font-size: $font-size-md;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: $color-nav-link;
      }

      &:focus {
        border-color: $color-secondary;
      }

      &:focus:hover {
        border-color: $color-secondary;
      }

      &:not(:placeholder-shown) + .cv-form__label,
      &:focus + .cv-form__label {
        top: 0;
        left: $space-md;
        font-size: $font-size-sm;
        background-color: $color-primary;
        padding: 0 $space-2xs;
        transform: translateY(-50%);
      }

      &:focus + .cv-form__label {
        color: $color-secondary;
      }

      &:not(:focus):not(:placeholder-shown) + .cv-form__label {
        color: $color-text-secondary;
      }
    }

    &__textarea {
      resize: none;
    }

    &__label {
      position: absolute;
      top: $modal-distance-top * 2.5;
      left: $space-md;
      transform: translateY(-50%);
      font-size: $font-size-md;
      color: $color-text-secondary;
      pointer-events: none;
      transition: all 0.25s ease;
    }

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
}
</style>
