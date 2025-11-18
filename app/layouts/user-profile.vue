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

const { data: user, refetch: refetchUser } = createQueryAdapter(getUserById, {
  variables: { id: userId },
});

provide('refetchUserInLayout', refetchUser);

const userName = computed(() => {
  if (user.value?.profile.first_name && user.value?.profile.last_name) {
    return `${user.value.profile.first_name} ${user.value.profile.last_name}`;
  }
  return user.value?.profile.first_name || user.value?.email || '';
});

type UserProfileTab = 'profile' | 'skills' | 'languages';
const userProfileTabs: UserProfileTab[] = ['profile', 'skills', 'languages'];

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const base: BreadcrumbItem[] = [{ label: 'Employees', to: '/users' }];

  const lastSegment = route.path.split('/').filter(Boolean).pop();
  const isRootProfilePage = lastSegment === userId || lastSegment === undefined;

  base.push({
    label: userName.value,
    to: `/users/${userId}/`,
    class: isRootProfilePage
      ? 'breadcrumb__highlight breadcrumb__highlight--static'
      : 'breadcrumb__highlight breadcrumb__highlight--link',
    icon: 'material-symbols:person-outline',
  });

  if (!isRootProfilePage && userProfileTabs.includes(lastSegment as UserProfileTab)) {
    base.push({ label: lastSegment!.charAt(0).toUpperCase() + lastSegment!.slice(1) });
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
  overflow-y: auto;
}
</style>
