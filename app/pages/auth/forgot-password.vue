<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Forgot password</h2>
    <p class="auth-content__subtitle">We will send you an email with further instructions</p>

    <form class="auth-form">
      <FormInput type="email" placeholder="example@email.com" />

      <FormAction link-to="/auth/login">
        <template #button-text>RESET PASSWORD</template>
        <template #link-text>CANCEL</template>
      </FormAction>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
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
