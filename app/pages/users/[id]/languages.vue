<template>
  <div>
    <h2>Languages</h2>
    <pre>{{ profile?.languages }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useUserProfile } from '~/composables/useUserProfile';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const route = useRoute();
const { profile } = await useUserProfile(route.params.id as string);
</script>
