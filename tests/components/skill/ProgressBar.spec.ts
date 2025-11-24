import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressBar from '~/components/skill/ProgressBar.vue';

describe('ProgressBar.vue', () => {
  it('display skill label', () => {
    const label = 'Vue.js';

    const wrapper = mount(ProgressBar, {
      props: {
        level: 'expert',
        skillLabel: label,
      },

      global: { stubs: { ProgressBar: true } },
    });

    expect(wrapper.text()).toContain(label);
  });

  it('send event click on clickable progress bar', async () => {
    const wrapper = mount(ProgressBar, {
      props: {
        level: 'novice',
        skillLabel: 'Test Skill',
      },
      global: { stubs: { ProgressBar: true } },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('add class is-readonly, when there is a prop readonly', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        level: 'novice',
        skillLabel: 'Test',
        readonly: true,
      },
      global: { stubs: { ProgressBar: true } },
    });

    expect(wrapper.classes()).toContain('is-readonly');
  });
});
