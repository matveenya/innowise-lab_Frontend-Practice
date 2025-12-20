import { describe, it, expect } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import BaseBreadcrumb from '~/components/ui/BaseBreadcrumb.vue';

describe('BaseBreadcrumb.vue', () => {
  const globalOptions = {
    stubs: {
      NuxtLink: RouterLinkStub,
      Icon: true,
    },
  };

  const cvBreadcrumbs = [
    {
      label: 'CVs',
      to: '/cvs',
      class: 'breadcrumb__link',
    },
    {
      label: 'Frontend Developer',
      to: { path: '/cvs/details', query: { id: '123' } },
      class: 'breadcrumb__highlight breadcrumb__highlight--link',
    },
    {
      label: 'Skills',
      class: 'breadcrumb__active',
    },
  ];

  it('renders CV breadcrumbs structure correctly', () => {
    const wrapper = mount(BaseBreadcrumb, {
      props: { items: cvBreadcrumbs },
      global: globalOptions,
    });

    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links[0].text()).toBe('CVs');
    expect(links[0].props().to).toBe('/cvs');
    expect(links[0].classes()).toContain('breadcrumb__link');

    expect(links[1].text()).toBe('Frontend Developer');
    expect(links[1].props().to).toEqual({ path: '/cvs/details', query: { id: '123' } });
    expect(links[1].classes()).toContain('breadcrumb__highlight');

    const activeSpan = wrapper.find('.breadcrumb__active');
    expect(activeSpan.exists()).toBe(true);
    expect(activeSpan.element.tagName).toBe('SPAN');
    expect(activeSpan.text()).toBe('Skills');

    const separators = wrapper.findAll('.breadcrumb__separator');
    expect(separators.length).toBe(2);
  });
});
