<template>
  <div>
    <h2>THIS IS USERS PAGE</h2>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>
