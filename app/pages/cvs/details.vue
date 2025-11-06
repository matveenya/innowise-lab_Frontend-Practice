<template>
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
        <textarea id="cv-description" rows="8" class="cv-form__textarea" placeholder=" "></textarea>
        <label for="cv-description" class="cv-form__label">Description</label>
      </div>

      <div class="cv-form__actions">
        <button type="submit" class="cv-form__button">Update</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
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
</style>
