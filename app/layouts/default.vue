<template>
  <div class="layout" :class="{ 'layout--menu-open': isMenuOpen }">
    <aside class="layout__aside" :class="{ 'layout__aside--open': isMenuOpen }">
      <NavLinks />
      <UserMenu />
      <button class="layout__button" :class="{ rotated: isMenuOpen }" @click="toggleMenu">
        <Icon name="ep:arrow-right-bold" size="1.2em" mode="svg" />
      </button>
    </aside>

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(true);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<style scoped lang="scss">
.layout {
  @include grid-layout(max-content 1fr);
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
    background-color: transparent;
    color: $color-text-primary;
    cursor: pointer;
    border-radius: $radius-full;
    transition:
      background-color 150ms ease,
      transform 0.3s ease;
    transform: rotate(0deg);

    &.rotated {
      transform: rotate(180deg);
    }

    & svg {
      transform-origin: center;
    }

    &:hover {
      background-color: $button-bg-disabled;
    }
  }

  &__main {
    width: 100%;
    overflow-y: hidden;
  }
}
</style>
