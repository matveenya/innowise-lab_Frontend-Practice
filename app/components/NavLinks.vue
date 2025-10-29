<script setup lang="ts">
const navLinks = [
  { label: 'Employees', icon: 'mdi:account-multiple', to: '/users' },
  { label: 'Skills', icon: 'material-symbols:trending-up', to: '/skills' },
  { label: 'Languages', icon: 'material-symbols:translate', to: '/languages' },
  { label: 'CVs', icon: 'material-symbols:contact-page-outline', to: '/cvs' },
];
</script>

<template>
  <nav class="nav-links">
    <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">
      <Icon :name="link.icon" size="1.5em" mode="svg" />
      <span>{{ link.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.nav-links {
  @include d-flex(start, stretch, column);
  width: 100%;
  flex: 1;
  gap: $space-lg;

  a {
    @include d-flex(start, center);
    gap: $space-lg;
    padding: $space-lg;
    width: 100%;
    border-top-right-radius: $radius-2xl;
    border-bottom-right-radius: $radius-2xl;
    color: $color-text-primary;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    line-height: 1.5;
    transition: background 0.2s ease;
    overflow-x: hidden;

    &:hover {
      background: $button-bg-disabled;
      color: $color-text-secondary;
    }
    svg {
      display: inline-block;
      flex-shrink: 0;
    }
  }
}
</style>
