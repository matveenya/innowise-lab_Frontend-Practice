<template>
  <div class="userbar">
    <button class="userbar-avatar" @click="toggleMenu">
      <Avatar label="U" class="userbar-avatar__icon" />
      <span class="userbar-avatar__name">User Name</span>
    </button>

    <Menu ref="menu" :model="items" :popup="true" class="userbar-menu">
      <template #item="{ item }">
        <NuxtLink v-if="item.to" :to="item.to" class="userbar-menu__item">
          <Icon :name="item.icon!" size="1.5em" mode="svg" />
          <span>{{ item.label }}</span>
        </NuxtLink>
        <button v-else class="userbar-menu__item" @click="item.command!">
          <Icon :name="item.icon!" size="1.5em" mode="svg" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';

const menu = ref<InstanceType<typeof Menu> | null>(null);
const authStore = useAuthStore();

interface UserMenuLink {
  label: string;
  icon: string;
  to?: string;
  command?: () => void;
}

const items: UserMenuLink[] = [
  { label: 'Profile', icon: 'ic:account-circle', to: '/profile' },
  { label: 'Settings', icon: 'ic:baseline-settings', to: '/settings' },
  { label: 'Logout', icon: 'ic:baseline-logout', command: () => authStore.logout() },
];

const toggleMenu = (event: Event) => {
  menu.value?.toggle(event);
};
</script>

<style lang="scss">
.userbar {
  position: relative;
  width: 100%;
  &-avatar {
    @include d-flex(flex-start, center);
    gap: $space-md;
    padding: $space-sm;
    width: 100%;
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
  &-menu {
    position: absolute;
    margin-inline: $space-xl;
    background-color: $color-primary;
    box-shadow: $shadow-md;
    border-radius: $radius-sm;
    &__item {
      @include d-flex(start, center);
      gap: $space-md;
      padding: $space-md $space-lg;
      width: 100%;
      background: transparent;
      color: $color-text-primary;
      font-size: $font-size-md;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s ease;
      border: none;

      &:hover {
        background: $button-bg-disabled;
      }
    }
  }
}
</style>
