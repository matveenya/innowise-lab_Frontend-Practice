import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MultiSelect from '~/components/ui/MultiSelect.vue';

describe('MultiSelect.vue', () => {
  const testOptions = [
    { id: 1, label: 'Vue.js' },
    { id: 2, label: 'React' },
  ];

  const globalOptions = {
    stubs: {
      MultiSelect: true,
      Icon: true,
    },
  };

  it('renders label and passes props correctly', () => {
    const wrapper = shallowMount(MultiSelect, {
      props: {
        label: 'Technologies',
        options: testOptions,
        modelValue: [],
        optionLabel: 'label',
        optionValue: 'id',
      },
      global: globalOptions,
    });

    expect(wrapper.text()).toContain('Technologies');

    const innerSelect = wrapper.findComponent({ name: 'MultiSelect' });
    expect(innerSelect.exists()).toBe(true);
    expect(innerSelect.props('options')).toHaveLength(2);
  });

  it('renders selected items as chips', () => {
    const MultiSelectStub = {
      name: 'MultiSelect',
      props: ['modelValue', 'options'],
      template: `
        <div>
          <slot name="value" :value="modelValue" />
        </div>
      `,
    };

    const wrapper = shallowMount(MultiSelect, {
      props: {
        label: 'Tech',
        options: testOptions,
        optionLabel: 'label',
        optionValue: 'id',
        modelValue: [1, 2],
      },
      global: {
        stubs: {
          MultiSelect: MultiSelectStub,
          Icon: true,
        },
      },
    });

    const chips = wrapper.findAll('.multiselect__chip');
    expect(chips).toHaveLength(2);
    expect(chips[0].text()).toContain('Vue.js');
    expect(chips[1].text()).toContain('React');
  });
});
