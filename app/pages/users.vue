<template>
  <div>
    <h2>THIS IS USERS PAGE</h2>
    <Button variant="primary">Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="primary" disabled>Disabled</Button>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
