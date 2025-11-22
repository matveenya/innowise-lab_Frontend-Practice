import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTabs from '~/components/ui/BaseTabs.vue';

describe('BaseTabs.vue', () => {
  const NuxtLinkStub = {
    props: ['to', 'custom'],
    template: `
      <div>
        <slot 
          :href="'/mock-path'" 
          :navigate="() => {}" 
          :isActive="to?.path?.includes('skills')" 
        />
      </div>
    `,
  };

  const cvTabs = [
    { label: 'DETAILS', to: { path: '/cvs/details', query: { id: '123' } } },
    { label: 'SKILLS', to: { path: '/cvs/skills', query: { id: '123' } } },
    { label: 'PROJECTS', to: { path: '/cvs/projects', query: { id: '123' } } },
    { label: 'PREVIEW', to: { path: '/cvs/preview', query: { id: '123' } } },
  ];

  it('renders tabs correctly', () => {
    const wrapper = mount(BaseTabs, {
      props: { items: cvTabs },
      global: {
        stubs: { NuxtLink: NuxtLinkStub },
      },
    });

    const tabs = wrapper.findAll('li.tabs__item');
    expect(tabs).toHaveLength(4);
    expect(tabs[0].text()).toBe('DETAILS');
    expect(tabs[1].text()).toBe('SKILLS');
    expect(tabs[2].text()).toBe('PROJECTS');
    expect(tabs[3].text()).toBe('PREVIEW');
  });

  it('sets active class on the correct tab', () => {
    const wrapper = mount(BaseTabs, {
      props: { items: cvTabs },
      global: {
        stubs: { NuxtLink: NuxtLinkStub },
      },
    });

    const tabs = wrapper.findAll('li.tabs__item');

    expect(tabs[0].classes()).not.toContain('tabs__item--active');
    expect(tabs[1].classes()).toContain('tabs__item--active');
    expect(tabs[2].classes()).not.toContain('tabs__item--active');
    expect(tabs[3].classes()).not.toContain('tabs__item--active');
  });
});
