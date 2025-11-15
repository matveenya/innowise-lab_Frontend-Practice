<template>
  <div>
    <h2>Languages</h2>
    <pre>{{ user?.profile.languages }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/composables/useUser';

definePageMeta({
  layout: 'user-profile',
  middleware: 'auth',
});

const route = useRoute();
const { user } = await useUser(route.params.id as string);
</script>
