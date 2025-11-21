import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreFilter from './GenreFilter.vue'

describe('GenreFilter', () => {
  const genres = ['Drama', 'Comedy', 'Sci-Fi']

  it('renders "All" plus the provided genres', () => {
    const wrapper = mount(GenreFilter, {
      props: { modelValue: 'All', genres },
    })

    const buttons = wrapper.findAll('button')
    // "All" + 3 genres = 4 buttons
    expect(buttons.length).toBe(4)
    expect(buttons[0]?.text()).toBe('All')
    expect(buttons[1]?.text()).toBe('Drama')
  })

  it('applies active class to selected genre', () => {
    const wrapper = mount(GenreFilter, {
      props: { modelValue: 'Comedy', genres },
    })

    const activeBtn = wrapper.find('.active')
    expect(activeBtn.exists()).toBe(true)
    expect(activeBtn.text()).toBe('Comedy')
  })

  it('emits update:modelValue when a genre is clicked', async () => {
    const wrapper = mount(GenreFilter, {
      props: { modelValue: 'All', genres },
    })

    const buttons = wrapper.findAll('button')
    // Click "Drama" (index 1)
    await buttons[1]?.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Drama'])
  })
})
