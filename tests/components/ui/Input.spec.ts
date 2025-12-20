import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '~/components/ui/Input.vue';

describe('Input.vue', () => {
  it('renders and updates value', async () => {
    const wrapper = mount(Input, {
      props: {
        id: 'simple-input',
        label: 'My Label',
        modelValue: '',
      },
    });

    expect(wrapper.text()).toContain('My Label');

    const input = wrapper.find('input');
    await input.setValue('Hello World');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello World']);
  });

  it('applies disabled state', () => {
    const wrapper = mount(Input, {
      props: {
        id: 'disabled-input',
        label: 'Disabled Label',
        modelValue: '',
        disabled: true,
      },
    });

    const input = wrapper.find('input');

    expect(input.element.disabled).toBe(true);
  });
});
