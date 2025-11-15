<template>
  <div>
    <h2>Profile</h2>
    <pre>{{ user?.profile }}</pre>
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
