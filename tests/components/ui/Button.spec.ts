import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '~/components/ui/Button.vue';

describe('Button.vue', () => {
  it('renders default slot content', () => {
    const buttonText = 'Click me';

    const wrapper = mount(Button, {
      props: { variant: 'primary' },
      slots: { default: buttonText },
    });

    expect(wrapper.text()).toBe(buttonText);
  });

  it('apply correct class based on variant prop', () => {
    const wrapper = mount(Button, {
      props: { variant: 'ghost' },
    });

    expect(wrapper.classes()).toContain('button__ghost');
  });

  it('apple disabled class when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('button--disabled');
  });

  it('set correct type attribute', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });
});
