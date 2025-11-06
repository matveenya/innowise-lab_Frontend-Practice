<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Set a new password</h2>
    <p class="auth-content__subtitle">Almost done! Now create a new password</p>

    <form class="auth-form" @submit.prevent="onSubmit">
      <FormInput
        name="password"
        type="password"
        placeholder="Enter new password"
        label="New Password"
      />

      <FormAction link-to="/auth/login">
        <template #button-text>SUBMIT</template>
        <template #link-text>BACK TO LOG IN</template>
      </FormAction>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '~/utils/schemas/authValidationSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

definePageMeta({
  layout: 'auth',
});

const { handleSubmit } = useForm<ResetPasswordSchema>({
  validationSchema: toTypedSchema(resetPasswordSchema),
});

const onSubmit = handleSubmit(() => {});
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
