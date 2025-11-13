<template>
  <ClientOnly>
    <Icon
      :name="iconName"
      class="p-column-sort-icon"
      :class="{ 'sort-icon-neutral': normalizedSortOrder === 0 }"
      mode="svg"
      size="1.1rem"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  sortOrder?: number | null;
}
const props = defineProps<Props>();

const normalizedSortOrder = computed(() => {
  if (props.sortOrder === 1) return 1;
  if (props.sortOrder === -1) return -1;
  return 0;
});

const iconName = computed(() =>
  normalizedSortOrder.value === 1 ? 'ic:baseline-arrow-upward' : 'ic:baseline-arrow-downward'
);
</script>

<style lang="scss">
.sort-icon-neutral {
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
