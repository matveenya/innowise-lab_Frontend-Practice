<template>
  <div>
    <h2>Skills</h2>
    <pre>{{ profile?.skills }}</pre>
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
