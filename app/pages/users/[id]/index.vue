<template>
  <div class="user-profile__container">
    <Avatar v-if="profile?.avatar" :image="profile.avatar" :pt="avatarPT" />
    <Avatar v-else-if="userName.length > 0" :label="userName[0]" :pt="avatarPT" />

    <div class="user-profile__info">
      <h4 class="user-profile__name">{{ userName }}</h4>
      <p class="user-profile__email">{{ user?.email }}</p>
      <p class="user-profile__member-since">A member since {{ memberSince }}</p>
    </div>
    <form class="user-profile__details">
      <Input id="first-name" v-model="firstName" label="First Name" :disabled="!isMyProfile" />
      <Input id="last-name" v-model="lastName" label="Last Name" :disabled="!isMyProfile" />
      <Select
        id="department"
        v-model="departmentId"
        label="Department"
        :options="departments ?? []"
        option-label="name"
        option-value="id"
        :disabled="!isMyProfile"
      />
      <Select
        id="position"
        v-model="positionId"
        label="Position"
        :options="positions ?? []"
        option-label="name"
        option-value="id"
        :disabled="!isMyProfile"
      />
      <Button v-if="isMyProfile" type="submit" variant="primary" class="user-profile__button"
        >Update</Button
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { getUserById, getUserProfile, getDepartments, getPositions } from '~/services/users';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import { formatDate } from '~/utils/dateUtils';
import { useAuthStore } from '~/stores/auth';
import Select from '~/components/ui/Select.vue';
import Button from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const route = useRoute();
const authStore = useAuthStore();
const userId = route.params.id as string;

const { data: user } = createQueryAdapter(getUserById, {
  variables: { id: userId },
});
const { data: profile } = createQueryAdapter(getUserProfile, {
  variables: { id: userId },
});
const { data: departments } = createQueryAdapter(getDepartments);
const { data: positions } = createQueryAdapter(getPositions);

const firstName = ref('');
const lastName = ref('');
const departmentId = ref<string | null>(null);
const positionId = ref<string | null>(null);

watchEffect(() => {
  firstName.value = profile.value?.first_name ?? '';
  lastName.value = profile.value?.last_name ?? '';
  departmentId.value = user.value?.department?.id ?? null;
  positionId.value = user.value?.position?.id ?? null;
});

const userName = computed(() => {
  if (profile.value?.first_name && profile.value?.last_name) {
    return `${profile.value.first_name} ${profile.value.last_name}`;
  }
  return profile.value?.first_name || user.value?.email || '';
});

const isMyProfile = computed(() => {
  return authStore.user?.id === userId;
});

const memberSince = computed(() => {
  return user.value?.created_at ? formatDate(user.value.created_at) : '';
});

const avatarPT = {
  root: { class: 'avatar__root' },
  image: { class: 'avatar__image' },
  label: { class: 'avatar__image' },
};
</script>

<style lang="scss">
.user-profile {
  &__container {
    max-width: $cv-details-width;
    width: 100%;
    margin-inline: auto;
    @include d-flex(center, center, column);
  }
  &__info {
    text-align: center;
    line-height: 1.5;
    margin-bottom: $space-5xl;
  }
  &__name {
    font-weight: $font-weight-regular;
    font-size: $font-size-2xl;
    line-height: 1.3;
    margin-bottom: $space-sm;
  }
  &__email {
    font-size: $font-size-md;
    color: rgba($color-text-primary, 0.7);
    line-height: 1.5;
    margin-bottom: $space-xs;
  }
  &__member-since {
    font-size: $font-size-md;
    line-height: 1.5;
  }
  &__details {
    @include grid-layout(1fr 1fr, none, $space-2xl $space-2xl);
    width: 100%;
  }
  &__button {
    grid-column: 2;
  }
}
.avatar__root {
  margin-block: $space-3xl;
}
.avatar__image {
  @include d-flex(center, center);
  flex-shrink: 0;
  width: $space-7xl;
  height: $space-7xl;
  background-color: $color-text-muted;
  border-radius: $radius-rounded;
  color: $color-primary;
  font-size: $font-size-6xl;
}
</style>
