import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormContainer from '~/components/auth/FormContainer.vue';

describe('FormContainer', () => {
  it('renders default content in the correct container', () => {
    const wrapper = mount(FormContainer, {
      props: { isCentered: false },
      slots: {
        default: '<div class="auth-form-container__content">Main Content</div>',
      },
    });

    const content = wrapper.find('.auth-form-container__content');
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('Main Content');
  });

  it('adds a modifier class if isCentered = true', () => {
    const wrapper = mount(FormContainer, {
      props: { isCentered: true },
    });

    expect(wrapper.classes()).toContain('auth-form-container--centered');
  });

  it('does not add a modifier class if isCentered = false', () => {
    const wrapper = mount(FormContainer, {
      props: { isCentered: false },
    });

    expect(wrapper.classes()).not.toContain('auth-form-container--centered');
  });

  it('renders the header block if the corresponding slot is passed', () => {
    const wrapper = mount(FormContainer, {
      props: { isCentered: false },
      slots: {
        header: '<div class="auth-form-container__header">Header Info</div>',
      },
    });

    const header = wrapper.find('.auth-form-container__header');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('Header Info');
  });

  it('does not render the header block if the slot is not passed', () => {
    const wrapper = mount(FormContainer, {
      props: { isCentered: false },
    });

    const header = wrapper.find('.auth-form-container__header');
    expect(header.exists()).toBe(false);
  });
});
