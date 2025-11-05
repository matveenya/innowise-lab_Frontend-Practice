<template>
  <div>
    <h2>THIS IS USERS PAGE</h2>
    <div v-for="user in users" :key="user.id">
      <p>{{ user.profile.first_name }} {{ user.profile.last_name }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.department_name }}</p>
      <p>{{ user.position_name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetUsers } from '~/graphql/hooks';

definePageMeta({
  middleware: 'auth',
});

const { data: users } = await useLazyAsyncData('users', () => useGetUsers());
</script>
