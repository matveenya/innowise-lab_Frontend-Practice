<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Set a new password</h2>
    <p class="auth-content__subtitle">Almost done! Now create a new password</p>

    <form class="auth-form" @submit.prevent="onSubmit">
      <FloatLabelInput
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
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '~/utils/schemas/authValidationSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { resetPassword as resetPasswordService } from '~/services/auth';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: 'auth',
});

const route = useRoute();
const toast = useToast();

const token = computed(() => route.query.token as string);

const { handleSubmit } = useForm<ResetPasswordSchema>({
  validationSchema: toTypedSchema(resetPasswordSchema),
});

onMounted(() => {
  if (!token.value) {
    toast.add({
      severity: 'Error',
      summary: 'Invalid Link',
      life: 5000,
    });
  }
});

const onSubmit = handleSubmit(async values => {
  if (!token.value) {
    return;
  }

  try {
    await resetPasswordService({ auth: { newPassword: values.password } }, token.value);

    toast.add({
      severity: 'success',
      summary: 'Create a new password',
      life: 3000,
    });

    setTimeout(() => {
      navigateTo('/auth/login');
    }, 1500);
  } catch (error) {
    console.error('Reset password error:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      life: 3000,
    });
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
