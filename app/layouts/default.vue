<script setup lang="ts">
import Avatar from 'primevue/avatar';

const isMenuOpen = ref(false);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<template>
  <div class="layout" :class="{ 'layout--menu-open': isMenuOpen }">
    <aside class="layout__aside" :class="{ 'layout__aside--open': isMenuOpen }">
      <NavLinks />
      <button class="user-avatar">
        <Avatar label="U" class="user-avatar__icon" />
        <span class="user-avatar__name">User Name</span>
      </button>
      <button class="layout__button" :class="{ rotated: isMenuOpen }" @click="toggleMenu">
        <Icon name="ep:arrow-right-bold" size="1.2em" mode="svg" />
      </button>
    </aside>

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-columns: max-content 1fr;
  height: 100vh;
  width: 100%;

  &__aside {
    width: $space-5xl;
    @include d-flex(start, flex-start, column);
    padding: $space-5xl 0 $space-lg 0;
    overflow-x: hidden;
    transition: width 0.3s;

    &--open {
      width: $sidebar-width-open;
    }
  }

  &__button {
    @include d-flex(center, center);
    padding: $space-md;
    margin: $space-md 0 0 $space-sm;
    background: transparent;
    color: $color-text-primary;
    cursor: pointer;
    border-radius: $radius-full;
    transition:
      background 0.3s ease,
      transform 0.3s ease;
    transform: rotate(0deg);

    &.rotated {
      transform: rotate(180deg);
    }

    & svg {
      transform-origin: center;
    }

    &:hover {
      background: $button-bg-disabled;
    }
  }

  &__main {
    padding-inline: $space-2xl;
  }
}

.user-avatar {
  @include d-flex(flex-start, center);
  gap: $space-md;
  width: 100%;
  padding: $space-sm;
  background: transparent;
  border-top-right-radius: $radius-2xl;
  border-bottom-right-radius: $radius-2xl;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: $button-bg-disabled;
  }

  &__icon {
    @include d-flex(center, center);
    flex-shrink: 0;
    width: $space-4xl;
    height: $space-4xl;
    background-color: $color-secondary;
    border-radius: $radius-rounded;
    color: $color-primary;
    font-size: $font-size-xl;
  }

  &__name {
    color: $color-text-primary;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    white-space: nowrap;
  }
}
</style>
