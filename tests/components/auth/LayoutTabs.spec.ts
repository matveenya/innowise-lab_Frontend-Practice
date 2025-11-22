import { describe, it, expect } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import LayoutTabs from '~/components/auth/LayoutTabs.vue';

describe('LayoutTabs.vue', () => {
  const globalOptions = {
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  };

  it('renders LOG IN and SIGN UP links with the correct paths', () => {
    const wrapper = mount(LayoutTabs, {
      global: globalOptions,
    });

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links).toHaveLength(2);

    const loginLink = links[0];
    expect(loginLink.text()).toBe('LOG IN');
    expect(loginLink.props().to).toBe('/auth/login');

    const signupLink = links[1];
    expect(signupLink.text()).toBe('SIGN UP');
    expect(signupLink.props().to).toBe('/auth/signup');
  });
});
