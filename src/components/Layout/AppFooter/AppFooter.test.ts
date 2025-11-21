import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from './AppFooter.vue'

describe('AppFooter', () => {
  it('renders copyright text with current year', () => {
    const wrapper = mount(AppFooter)
    const currentYear = new Date().getFullYear()

    expect(wrapper.text()).toContain(`© ${currentYear} TV Show Dashboard`)
  })

  it('renders TVMaze API link', () => {
    const wrapper = mount(AppFooter)

    const link = wrapper.find('.footer-link')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('TVMaze API')
    expect(link.attributes('href')).toBe('https://www.tvmaze.com/api')
  })

  it('opens TVMaze link in new tab', () => {
    const wrapper = mount(AppFooter)

    const link = wrapper.find('.footer-link')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('renders footer text elements', () => {
    const wrapper = mount(AppFooter)

    const texts = wrapper.findAll('.footer-text')
    expect(texts).toHaveLength(2)
  })
})
