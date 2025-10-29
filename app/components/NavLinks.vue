<template>
  <nav class="nav-links">
    <NuxtLink to="/users">
      <Icon name="mdi:account-multiple" size="1.5em" mode="svg" />
      <span>Employees</span>
    </NuxtLink>
    <NuxtLink to="/skills">
      <Icon name="material-symbols:trending-up" size="1.5em" mode="svg" />
      <span>Skills</span>
    </NuxtLink>
    <NuxtLink to="/languages">
      <Icon name="material-symbols:translate" size="1.5em" mode="svg" />
      <span>Languages</span>
    </NuxtLink>
    <NuxtLink to="/cvs">
      <Icon name="material-symbols:contact-page-outline" size="1.5em" mode="svg" />
      <span>CVs</span>
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
