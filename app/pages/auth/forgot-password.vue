<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Forgot password</h2>
    <p class="auth-content__subtitle">We will send you an email with further instructions</p>

    <form class="auth-form" @submit.prevent="onSubmit">
      <FormInput name="email" type="email" placeholder="example@email.com" label="Email" />

      <FormAction link-to="/auth/login">
        <template #button-text>RESET PASSWORD</template>
        <template #link-text>CANCEL</template>
      </FormAction>
      <Toast />
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '~/utils/schemas/authValidationSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useForgotPassword } from '~/graphql/hooks/auth';

definePageMeta({
  layout: 'auth',
});

const { handleSubmit, setFieldError, resetForm } = useForm<ForgotPasswordSchema>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
});

const onSubmit = handleSubmit(async values => {
  try {
    await useForgotPassword(values);

    resetForm();
    navigateTo('/auth/login');
  } catch (error) {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(graphQLError => {
        if (graphQLError.message.toLowerCase().includes('email')) {
          setFieldError('email', graphQLError.message);
        }
      });
    }
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

  .auth-form {
    @include d-flex(center, center, column);
    gap: $space-xl;
  }
}
</style>
