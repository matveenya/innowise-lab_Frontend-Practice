<!-- <template>
  <div class="auth-content">
    <h2 class="auth-content__title">Welcome back</h2>
    <p class="auth-content__subtitle">Hello again! Log in to continue</p>

    <form class="auth-form" @submit.prevent="onSubmit">
      <FormInput name="email" type="email" placeholder="Email" />
      <FormPasswordInput name="password" />

      <FormAction link-to="/auth/forgot-password">
        <template #button-text>LOG IN</template>
        <template #link-text>FORGOT PASSWORD</template>
      </FormAction>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authSchema, type AuthSchema } from '~/utils/schemas/authValidationSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

definePageMeta({
  layout: 'auth',
});

const { handleSubmit } = useForm<AuthSchema>({
  validationSchema: toTypedSchema(authSchema),
});

const onSubmit = handleSubmit(() => {
  navigateTo('/');
});
</script>

<style scoped lang="scss">
.auth-content {
  text-align: center;

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-xl;
  }

  &__subtitle {
    font-size: $font-size-md;
    color: $color-text-secondary;
    margin-bottom: $space-5xl;
  }
}

.auth-form {
  @include d-flex(center, center, column);
  gap: $space-xl;
}
</style> -->

//TODO: Delete after tset
<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Welcome back</h2>
    <p class="auth-content__subtitle">Hello again! Log in to continue</p>

    <form class="auth-form" @submit.prevent="onSubmit">
      <FormInput name="email" type="email" placeholder="Email" />
      <FormPasswordInput name="password" />

      <FormAction link-to="/auth/forgot-password">
        <template #button-text>LOG IN</template>
        <template #link-text>FORGOT PASSWORD</template>
      </FormAction>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authSchema, type AuthSchema } from '~/utils/schemas/authValidationSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useLogin } from '~/composables/useLogin';

const { login, error } = useLogin();

definePageMeta({
  layout: 'auth',
});

const { handleSubmit, values } = useForm<AuthSchema>({
  validationSchema: toTypedSchema(authSchema),
});

const onSubmit = handleSubmit(async () => {
  try {
    const result = await login({
      email: values.email,
      password: values.password,
    });
    if (result?.login?.user) {
      navigateTo('/users');
    }
  } catch {
    console.error(error.value);
  }
});
</script>

<style scoped lang="scss">
.auth-content {
  text-align: center;

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-xl;
  }

  &__subtitle {
    font-size: $font-size-md;
    color: $color-text-secondary;
    margin-bottom: $space-5xl;
  }
}

.auth-form {
  @include d-flex(center, center, column);
  gap: $space-xl;
}
</style>
