import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Select from '~/components/skill/Select.vue';

describe('Select.vue', () => {
  const globalOptions = {
    stubs: {
      Select: {
        template: '<div class="p-select-stub"><slot name="value" :value="modelValue"></slot></div>',
        props: ['modelValue', 'options'],
      },
      Icon: true,
    },
  };

  it('display selected skill label', () => {
    const labelText = 'Choose level';

    const wrapper = mount(Select, {
      props: {
        modelValue: null,
        options: [],
        label: labelText,
      },
      global: globalOptions,
    });

    const labelElement = wrapper.find('.skill-select__label');
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.text()).toBe(labelText);
  });

  it('apply class disables when disabled prop is true', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: null,
        options: [],
        disabled: true,
      },
      global: globalOptions,
    });

    expect(wrapper.find('.skill-select__field').classes()).toContain(
      'skill-select__field--disabled'
    );
  });
});
