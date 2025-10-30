<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Welcome back</h2>
    <p class="auth-content__subtitle">Hello again! Log in to continue</p>

    <form class="auth-form">
      <FormInput type="email" placeholder="Email" />
      <FormPasswordInput />

      <FormAction link-to="/auth/forgot-password">
        <template #button-text>LOG IN</template>
        <template #link-text>FORGOT PASSWORD</template>
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
