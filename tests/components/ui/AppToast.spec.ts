import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppToast from '~/components/ui/AppToast.vue';

describe('AppToast.vue', () => {
  const globalOptions = {
    stubs: {
      Toast: {
        name: 'Toast',
        template: '<div class="p-toast-stub"></div>',
        props: ['position', 'pt'],
      },
    },
  };

  it('renders Toast component with default position', () => {
    const wrapper = mount(AppToast, {
      global: globalOptions,
    });

    const toastStub = wrapper.findComponent({ name: 'Toast' });

    expect(toastStub.exists()).toBe(true);
    expect(toastStub.props().position).toBe('top-right');
  });

  it('passes custom position prop correctly', () => {
    const position = 'bottom-center';
    const wrapper = mount(AppToast, {
      props: { position },
      global: globalOptions,
    });

    const toastStub = wrapper.findComponent({ name: 'Toast' });

    expect(toastStub.props().position).toBe(position);
  });

  it('passes pass-through (pt) configuration correctly', () => {
    const wrapper = mount(AppToast, {
      global: globalOptions,
    });

    const toastStub = wrapper.findComponent({ name: 'Toast' });
    const pt = toastStub.props().pt;

    expect(pt).toBeDefined();
    expect(pt.root.class).toBe('toast-root');
    expect(pt.message.class).toBe('toast-message');
    expect(pt.icon.class).toBe('hidden');
  });
});
