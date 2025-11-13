<template>
  <button
    class="icon-button"
    :class="{ 'is-current-user': props.isCurrentUser }"
    :aria-label="props.ariaLabel"
    @click="handleClick"
  >
    <ClientOnly>
      <Icon :name="props.iconName" mode="svg" size="1.5rem" class="icon" />
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  isCurrentUser: boolean;
  ariaLabel: string;
}>();

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style lang="scss">
.icon-button {
  background: transparent;
  padding: $space-sm;
  margin: 0;
  border-radius: $radius-rounded;
  @include d-flex(center, center);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba($color-text-primary, 0.08);
  }

  .icon {
    color: $color-text-secondary;
  }

  &:hover .icon {
    color: $color-text-primary;
  }
}
</style>
