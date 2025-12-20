<template>
  <div class="auth-layout">
    <AuthFormContainer :is-centered="isPageCentered">
      <template v-if="!isPageCentered" #header>
        <AuthLayoutTabs />
      </template>

      <slot />
    </AuthFormContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const isPageCentered = computed(
  () => route.path.includes('/forgot-password') || route.path.includes('/reset-password')
);
</script>

<style scoped lang="scss"></style>
