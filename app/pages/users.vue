<template>
  <div>
    <h2>THIS IS USERS PAGE</h2>
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-for="user in users" :key="user.id">
      <p>{{ user.profile.first_name }} {{ user.profile.last_name }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.department_name }}</p>
      <p>{{ user.position_name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUsers as getUsersService } from '~/services/users';
import { createQueryAdapter } from '~/utils/apolloAdapters';

const { data: users, loading, error } = createQueryAdapter(getUsersService);

definePageMeta({
  middleware: 'auth',
});
</script>
