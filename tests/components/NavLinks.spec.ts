import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import NavLinks from '~/components/NavLinks.vue';

describe('NavLinks.vue', () => {
  const globalOptions = {
    stubs: {
      NuxtLink: {
        template: '<a :href="to"><slot /></a>',
        props: ['to'],
      },
      Icon: {
        template: '<span class="icon-stub" :data-name="name"></span>',
        props: ['name'],
      },
    },
  };

  it('renders navigation links correctly', () => {
    const wrapper = shallowMount(NavLinks, {
      global: globalOptions,
    });

    expect(wrapper.exists()).toBe(true);

    const links = wrapper.findAll('a');

    expect(links.length).toBe(4);
  });

  it('displays correct link labels and icons', () => {
    const wrapper = shallowMount(NavLinks, {
      global: globalOptions,
    });

    const links = wrapper.findAll('a');

    expect(links[0].text()).toBe('Employees');
    expect(links[1].text()).toBe('Skills');
    expect(links[2].text()).toBe('Languages');
    expect(links[3].text()).toBe('CVs');
  });
});
