import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Textarea from '~/components/ui/Textarea.vue';

describe('Textarea.vue', () => {
  it('renders properly and updates value', async () => {
    const wrapper = mount(Textarea, {
      props: {
        id: 'Textarea',
        label: 'Test Label',
        modelValue: '',
        placeholder: 'Enter text',
        rows: 8,
      },
    });

    expect(wrapper.text()).toContain('Test Label');

    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe('Enter text');
    expect(textarea.attributes('rows')).toBe('8');

    await textarea.setValue('New textarea content');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New textarea content']);
  });

  it('generates correct ID from name prop', () => {
    const wrapper = mount(Textarea, {
      props: {
        name: 'id',
        label: 'Label',
        modelValue: '',
      },
    });

    const textarea = wrapper.find('textarea');
    const label = wrapper.find('label');

    expect(textarea.attributes('id')).toBe('id');
    expect(label.attributes('for')).toBe('id');
  });

  it('applies disabled state', () => {
    const wrapper = mount(Textarea, {
      props: {
        label: 'Disabled label',
        modelValue: '',
        disabled: true,
      },
    });

    const textarea = wrapper.find('textarea');
    expect(textarea.element.disabled).toBe(true);
  });

  it('works with vee-validate integration (Integration Test)', async () => {
    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        label: 'Description',
        modelValue: 'Initial Value',
      },
    });

    const textarea = wrapper.find('textarea');

    expect(textarea.element.value).toBe('Initial Value');

    await textarea.setValue('Updated Value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Updated Value']);
  });
});
