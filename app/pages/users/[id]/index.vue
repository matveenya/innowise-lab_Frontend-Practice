<template>
  <div class="user-profile__container">
    <div class="user-profile__avatar-section">
      <div class="user-profile__avatar-wrapper">
        <Avatar
          v-if="avatarPreview || profile?.avatar"
          :key="avatarPreview || profile?.avatar || 'image'"
          :image="avatarPreview || profile?.avatar || ''"
          :pt="avatarPT"
        />
        <Avatar
          v-else-if="userName.length > 0"
          key="label"
          :label="userName[0]?.toUpperCase()"
          :pt="avatarPT"
        />

        <button
          v-if="isMyProfile && (avatarPreview || profile?.avatar)"
          class="user-profile__avatar-remove"
          type="button"
          @click.stop="removeAvatar"
        >
          <Icon name="material-symbols:close" mode="svg" size="1.5rem" />
        </button>
      </div>

      <div v-if="isMyProfile" class="user-profile__upload" @click="triggerFileInput">
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/gif"
          class="user-profile__upload-input"
          @change="handleFileSelect"
        />

        <h5 class="user-profile__upload-title">
          <Icon
            name="material-symbols:upload"
            class="user-profile__upload-icon"
            mode="svg"
            size="2.3rem"
          />Upload Avatar Image
        </h5>
        <p class="user-profile__upload-hint">png, jpg or gif no more than 0.5MB</p>
      </div>
    </div>

    <div class="user-profile__info">
      <h4 class="user-profile__name">{{ userName }}</h4>
      <p class="user-profile__email">{{ user?.email }}</p>
      <p class="user-profile__member-since">A member since {{ memberSince }}</p>
    </div>
    <form class="user-profile__details" @submit.prevent="onSubmit">
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
      <Button
        v-if="isMyProfile"
        type="submit"
        variant="primary"
        class="user-profile__button"
        :disabled="!meta.dirty || isSubmitting"
        >Update</Button
      >
    </form>
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from 'primevue/usetoast';
import { getUserById, getUserProfile, getDepartments, getPositions } from '~/services/users';
import { createQueryAdapter } from '~/utils/apolloAdapters';
import { formatDate } from '~/utils/dateUtils';
import { useAuthStore } from '~/stores/auth';
import Select from '~/components/ui/Select.vue';
import Button from '~/components/ui/Button.vue';
import AppToast from '~/components/ui/AppToast.vue';
import { userProfileSchema } from '~/utils/schemas/userValidationSchema';
import type { UserProfileForm } from '~/utils/schemas/userValidationSchema';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const route = useRoute();
const authStore = useAuthStore();
const userId = route.params.id as string;
const toast = useToast();

const { data: user } = createQueryAdapter(getUserById, {
  variables: { id: userId },
});
const { data: profile } = createQueryAdapter(getUserProfile, {
  variables: { id: userId },
});
const { data: departments } = createQueryAdapter(getDepartments);
const { data: positions } = createQueryAdapter(getPositions);

const { handleSubmit, meta, resetForm, isSubmitting } = useForm<UserProfileForm>({
  validationSchema: toTypedSchema(userProfileSchema),
  initialValues: {
    firstName: '',
    lastName: '',
    departmentId: null,
    positionId: null,
  },
});

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: departmentId } = useField<string | null>('departmentId');
const { value: positionId } = useField<string | null>('positionId');

const isFormInitialized = ref(false);

watchEffect(() => {
  if (!profile.value || !user.value || isFormInitialized.value) return;

  resetForm({
    values: {
      firstName: profile.value.first_name ?? '',
      lastName: profile.value.last_name ?? '',
      departmentId: user.value.department?.id ?? null,
      positionId: user.value.position?.id ?? null,
    },
  });

  isFormInitialized.value = true;
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

const onSubmit = handleSubmit(async values => {
  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (selectedFile.value) {
      formData.append('avatar', selectedFile.value);
    }

    toast.add({
      severity: 'success',
      summary: 'Profile was updated',
      life: 3000,
    });
    resetForm({ values });
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Failed to update profile',
      life: 3000,
    });
  }
});

const avatarPT = {
  root: { class: 'avatar__root' },
  image: { class: 'avatar__image' },
  label: { class: 'avatar__image' },
};

const fileInput = ref<HTMLInputElement | null>(null);
const avatarPreview = ref<string>('');
const selectedFile = ref<File | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const maxSize = 0.5 * 1024 * 1024;
  if (file.size > maxSize) {
    toast.add({
      severity: 'error',
      summary: 'File size exceeds 0.5MB',
      life: 3000,
    });
    return;
  }

  if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
    toast.add({
      severity: 'error',
      summary: 'Please select a PNG, JPG or GIF image',
      life: 3000,
    });
    return;
  }

  selectedFile.value = file;

  if (avatarPreview.value && avatarPreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(avatarPreview.value);
  }
  avatarPreview.value = URL.createObjectURL(file);
};

const removeAvatar = () => {
  if (avatarPreview.value && avatarPreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(avatarPreview.value);
  }
  avatarPreview.value = '';
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

onUnmounted(() => {
  if (avatarPreview.value && avatarPreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(avatarPreview.value);
  }
});
</script>

<style lang="scss">
.user-profile {
  &__container {
    max-width: $cv-details-width;
    width: 100%;
    margin-inline: auto;
    @include d-flex(center, center, column);
  }

  &__avatar-section {
    @include d-flex(center, center);
    gap: $space-4xl;
    margin-block: $space-3xl;
  }

  &__avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  &__avatar-remove {
    position: absolute;
    top: -$space-xl;
    right: -$space-lg;
    padding: $space-sm;
    @include d-flex(center, center);
    background-color: transparent;
    border: none;
    border-radius: $radius-rounded;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: $color-text-primary;
    font-size: $font-size-lg;

    &:hover {
      background-color: rgba($color-text-primary, 0.08);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__upload {
    @include d-flex(center, center, column);
    gap: $space-sm;
    min-width: 240px;
    padding: $space-2xl;
    border-radius: $radius-sm;
    cursor: pointer;

    &-title {
      @include d-flex(center, center);
      gap: $space-sm;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      color: $color-text-primary;
    }

    &-hint {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      margin: 0;
      text-align: center;
    }

    &-input {
      display: none;
    }
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
  flex-shrink: 0;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
