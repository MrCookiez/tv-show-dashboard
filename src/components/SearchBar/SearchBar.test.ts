import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar', () => {
  it('renders the input with correct placeholder', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search shows...')
  })

  it('initializes with the modelValue prop', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'Breaking' },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Breaking')
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')
    await input.setValue('Dark')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Dark'])
  })
})
