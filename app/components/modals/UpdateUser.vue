<template>
  <ModalsBaseModal :is-visible="isVisible" @update:is-visible="val => (isVisible = val)">
    <template #header>
      <h3 class="modal__title">Update User</h3>
    </template>

    <template #body>
      <form class="update-user-form" @submit.prevent="onSubmit">
        <Input id="firstName" v-model="firstName" label="First Name" />
        <Input id="lastName" v-model="lastName" label="Last Name" />
        <Select
          id="department"
          v-model="departmentId"
          label="Department"
          :options="referencesStore.departments"
          option-label="name"
          option-value="id"
        />
        <Select
          id="position"
          v-model="positionId"
          label="Position"
          :options="referencesStore.positions"
          option-label="name"
          option-value="id"
        />
        <Select id="role" v-model="role" :disabled="true" :options="roles" label="Role" />
        <Input id="email" v-model="email" :disabled="true" label="Email" />
      </form>
    </template>

    <template #footer>
      <Button variant="outline" @click="close">Cancel</Button>
      <Button variant="primary" :disabled="!meta.dirty || !meta.valid" @click="onSubmit"
        >Update</Button
      >
    </template>
  </ModalsBaseModal>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { User, UpdateUserInput } from '~/graphql/types';
import { updateUser, updateProfile } from '~/services/users';
import Button from '../ui/Button.vue';
import Select from '../ui/Select.vue';
import { updateUserSchema } from '~/utils/schemas/userValidationSchema';
import type { UpdateUserForm } from '~/utils/schemas/userValidationSchema';
import { useReferencesStore } from '~/stores/references';

const isVisible = ref(false);
const currentUser = ref<User | null>(null);

const referencesStore = useReferencesStore();
const roles = ref<string[]>(['Employee', 'Admin']);

const { handleSubmit, meta, resetForm } = useForm<UpdateUserForm>({
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    email: '',
    firstName: '',
    lastName: '',
    departmentId: '',
    positionId: '',
    role: 'Employee',
  },
});

const { value: email } = useField<string>('email');
const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: departmentId } = useField<string | null>('departmentId');
const { value: positionId } = useField<string | null>('positionId');
const { value: role } = useField<string>('role');

const open = async (user: User) => {
  currentUser.value = user;

  try {
    await referencesStore.loadReferences();

    resetForm({
      values: {
        email: user.email ?? '',
        firstName: user.profile.first_name ?? '',
        lastName: user.profile.last_name ?? '',
        departmentId: user.department?.id ?? '',
        positionId: user.position?.id ?? '',
        role: user.role ?? 'Employee',
      },
    });

    isVisible.value = true;
  } catch (error) {
    console.error('Failed to load dependencies for user update', error);
  }
};

const close = () => {
  isVisible.value = false;
  currentUser.value = null;
  resetForm({
    values: {
      email: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      positionId: '',
      role: 'Employee',
    },
  });
};

const onSubmit = handleSubmit(async values => {
  if (!currentUser.value?.id) return;

  try {
    const userId = currentUser.value.id;
    const userPayload = {
      userId,
      role: values.role,
      departmentId: values.departmentId || '',
      positionId: values.positionId || '',
    };
    const profilePayload = {
      userId,
      first_name: values.firstName?.trim() || '',
      last_name: values.lastName?.trim() || '',
    };
    await Promise.all([
      updateUser({ user: userPayload as UpdateUserInput }),
      updateProfile({ profile: profilePayload }),
    ]);
    close();
    emit('updateUser');
  } catch (error) {
    console.error(error);
  }
});

const emit = defineEmits(['updateUser']);

defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.update-user-form {
  @include grid-layout(repeat(2, 1fr), auto, 1.5rem);
}
</style>
