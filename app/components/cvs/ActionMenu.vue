<template>
  <Menu ref="menu" :model="computedItems" :popup="true" class="cv-actions-menu">
    <template #item="{ item }">
      <button
        class="cv-actions-menu__item"
        @click="e => item.command && item.command({ originalEvent: e, item })"
      >
        <Icon v-if="item.icon" :name="item.icon" size="1.2em" mode="svg" />
        <span>{{ item.label }}</span>
      </button>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import { computed, ref } from 'vue';

export interface ActionMenuItem {
  label: string;
  command?: () => void;
}

const props = defineProps<{
  items?: ActionMenuItem[];
}>();

const emit = defineEmits(['details', 'delete']);

const menu = ref<InstanceType<typeof Menu> | null>(null);

const defaultItems = [
  {
    label: 'Details',
    command: () => emit('details'),
  },
  {
    label: 'Delete CV',
    command: () => emit('delete'),
  },
];

const computedItems = computed(() => props.items || defaultItems);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};

defineExpose({
  toggle,
});
</script>

<style lang="scss">
.cv-actions-menu {
  position: absolute;
  min-width: calc($sidebar-width-open / 2);
  background-color: $color-bg-action-cv;
  box-shadow: $shadow-md;
  border-radius: $radius-sm;
  overflow: hidden;
  padding: $space-xs 0;

  &__item {
    @include d-flex(flex-start, center);
    gap: $space-md;
    width: 100%;
    padding: $space-md $space-lg;
    color: $color-text-primary;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: $button-bg-disabled;
    }
  }
}
</style>
