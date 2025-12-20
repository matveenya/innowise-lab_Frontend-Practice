import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SearchInput from '~/components/ui/SearchInput.vue';

describe('SearchInput.vue', () => {
  const globalOptions = {
    stubs: {
      Icon: true,
    },
  };

  it('renders correctly with default props', () => {
    const wrapper = shallowMount(SearchInput, {
      props: { modelValue: '' },
      global: globalOptions,
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Search');
    expect(wrapper.find('.clear-button').exists()).toBe(false);
  });

  it('renders custom placeholder', () => {
    const wrapper = shallowMount(SearchInput, {
      props: {
        modelValue: '',
        placeholder: 'Find users...',
      },
      global: globalOptions,
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Find users...');
  });

  it('updates model value on input', async () => {
    const wrapper = shallowMount(SearchInput, {
      props: { modelValue: '' },
      global: globalOptions,
    });

    const input = wrapper.find('input');
    await input.setValue('New search');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['New search']);
  });

  it('shows clear button when value is present', () => {
    const wrapper = shallowMount(SearchInput, {
      props: { modelValue: 'Something' },
      global: globalOptions,
    });

    expect(wrapper.find('.clear-button').exists()).toBe(true);
  });

  it('clears input when clear button is clicked', async () => {
    const wrapper = shallowMount(SearchInput, {
      props: { modelValue: 'Text' },
      global: globalOptions,
    });

    const clearButton = wrapper.find('.clear-button');
    await clearButton.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')!.slice(-1)[0]).toEqual(['']);
  });

  it('clears input on ESC key press', async () => {
    const wrapper = shallowMount(SearchInput, {
      props: { modelValue: 'Text' },
      global: globalOptions,
    });

    const input = wrapper.find('input');
    await input.trigger('keydown.esc');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')!.slice(-1)[0]).toEqual(['']);
  });
});
