import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from '~/components/language/Badge.vue';

describe('LanguageBadge.vue', () => {
  it('render language label', () => {
    const label = 'English';
    const wrapper = mount(Badge, {
      props: {
        languageLabel: label,
        proficiency: 'expert',
      },
    });

    expect(wrapper.text()).toContain(label);
  });

  it('apply correct proficiency class', () => {
    const wrapper = mount(Badge, {
      props: {
        languageLabel: 'English',
        proficiency: 'novice',
      },
    });

    const proficiencyEl = wrapper.find('.language-proficiency');
    expect(proficiencyEl.classes()).toContain('proficiency-novice');
  });

  it('render proficiency text correctly', () => {
    const wrapper = mount(Badge, {
      props: {
        languageLabel: 'English',
        proficiency: 'novice',
      },
    });

    expect(wrapper.find('.language-proficiency').text()).toBe('novice');
  });

  it('emit click event', async () => {
    const wrapper = mount(Badge, {
      props: {
        languageLabel: 'English',
        proficiency: 'expert',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('apply is-editable class when prop is set', () => {
    const wrapper = mount(Badge, {
      props: {
        languageLabel: 'English',
        proficiency: 'expert',
        isEditable: true,
      },
    });

    expect(wrapper.classes()).toContain('is-editable');
  });
});
