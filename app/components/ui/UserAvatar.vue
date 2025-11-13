<template>
  <Avatar
    v-if="data.profile?.avatar"
    :image="data.profile.avatar"
    shape="circle"
    size="xlarge"
    :pt="avatarPT"
  />
  <Avatar v-else :label="getAvatarLabel(data)" shape="circle" size="xlarge" :pt="avatarPT" />
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import type { User } from '~/graphql/types/user';

defineProps<{
  data: User;
}>();
type AvatarLabel = Pick<User, 'profile' | 'email'>;
const avatarPT = {
  root: { class: 'user-avatar' },
  image: { class: 'user-avatar__image' },
  label: { class: 'user-avatar__label' },
};

const getAvatarLabel = (userData: AvatarLabel) => {
  const firstName = userData.profile?.first_name || '';
  const email = userData.email || '';

  return (firstName.charAt(0) || email.charAt(0)).toUpperCase();
};
</script>

<style lang="scss">
.user-avatar {
  width: $space-4xl;
  height: $space-4xl;
  border-radius: $radius-rounded;
  @include d-flex(center, center);
  background-color: $color-text-muted;
  color: $color-primary;
  overflow: hidden;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__label {
    line-height: 1;
  }
}
</style>
