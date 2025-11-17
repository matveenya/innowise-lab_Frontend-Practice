<template>
  <NuxtLayout name="default">
    <div class="user-profile">
      <BaseBreadcrumb :items="breadcrumbItems" />
      <BaseTabs :items="tabItems" />

      <div class="user-profile__content">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/ui/BaseBreadcrumb.vue';
import type { TabItem } from '~/components/ui/BaseTabs.vue';
import { getUserById } from '~/services/users';
import { createQueryAdapter } from '~/utils/apolloAdapters';

const route = useRoute();
const userId = route.params.id as string;

const { data: user } = createQueryAdapter(getUserById, {
  variables: { id: userId },
});

const userName = computed(() => {
  if (user.value?.profile.first_name && user.value?.profile.last_name) {
    return `${user.value.profile.first_name} ${user.value.profile.last_name}`;
  }
  return user.value?.profile.first_name || user.value?.email || '';
});

type UserProfileTab = 'profile' | 'skills' | 'languages';
const userProfileTabs: UserProfileTab[] = ['profile', 'skills', 'languages'];

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const base: BreadcrumbItem[] = [
    { label: 'Employees', to: '/users' },
    {
      label: userName.value,
      to: `/users/${userId}/`,
      class: 'breadcrumb__cv-name--link',
      icon: 'material-symbols:person-outline',
    },
  ];

  const lastItem = route.path.split('/').pop();
  if (lastItem && userProfileTabs.includes(lastItem as UserProfileTab)) {
    base.push({ label: lastItem.charAt(0).toUpperCase() + lastItem.slice(1) });
  }

  return base;
});

const tabItems = computed<TabItem[]>(() => {
  if (!userId) return [];

  return [
    { label: 'PROFILE', to: `/users/${userId}/` },
    { label: 'SKILLS', to: `/users/${userId}/skills` },
    { label: 'LANGUAGES', to: `/users/${userId}/languages` },
  ];
});
</script>

<style scoped lang="scss">
.user-profile {
  max-width: $container-wide;
  margin-inline: auto;
  padding: $space-lg $space-2xl;
}
</style>
