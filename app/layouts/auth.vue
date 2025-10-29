<template>
  <div class="auth-layout">
    <AuthFormContainer :is-forgot-password="isForgotPasswordPage">
      <AuthLayoutTabs v-if="!isForgotPasswordPage" />

      <slot />
    </AuthFormContainer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const isForgotPasswordPage = computed(() => route.path.includes('/forgot-password'));
</script>

<style scoped lang="scss"></style>
