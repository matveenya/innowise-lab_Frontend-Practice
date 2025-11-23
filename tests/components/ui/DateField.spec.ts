import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DateField from '~/components/ui/DateField.vue';

describe('DateField.vue', () => {
  const globalOptions = {
    stubs: {
      DatePicker: true,
    },
  };

  it('renders correctly', () => {
    const wrapper = mount(DateField, {
      props: { id: 'test-id', label: 'My Date' },
      global: globalOptions,
    });

    expect(wrapper.find('label').text()).toBe('My Date');
    expect(wrapper.findComponent({ name: 'DatePicker' }).exists()).toBe(true);
  });

  it('toggles active class on label', async () => {
    const wrapper = mount(DateField, {
      props: {
        id: 'test-id',
        label: 'Label',
        modelValue: null,
      },
      global: globalOptions,
    });

    const label = wrapper.find('label');

    expect(label.classes()).not.toContain('floating-label--active');
    await wrapper.setProps({ modelValue: new Date() });
    expect(label.classes()).toContain('floating-label--active');
  });
});
