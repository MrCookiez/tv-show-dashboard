import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from './HomeHero.vue'

describe('HomeHero', () => {
  it('renders the title', () => {
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.hero-title').text()).toBe('Discover TV Shows')
  })

  it('renders the subtitle', () => {
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.hero-subtitle').text()).toBe('Search and explore shows by genre')
  })

  it('has search slot', () => {
    const wrapper = mount(HomeHero, {
      slots: {
        search: '<div class="search-component">Search Bar</div>',
      },
    })

    expect(wrapper.find('.search-component').exists()).toBe(true)
    expect(wrapper.find('.search-component').text()).toBe('Search Bar')
  })

  it('has filters slot', () => {
    const wrapper = mount(HomeHero, {
      slots: {
        filters: '<div class="filter-component">Filters</div>',
      },
    })

    expect(wrapper.find('.filter-component').exists()).toBe(true)
    expect(wrapper.find('.filter-component').text()).toBe('Filters')
  })

  it('renders both slots together', () => {
    const wrapper = mount(HomeHero, {
      slots: {
        search: '<div class="search">Search</div>',
        filters: '<div class="filters">Filters</div>',
      },
    })

    expect(wrapper.find('.search').exists()).toBe(true)
    expect(wrapper.find('.filters').exists()).toBe(true)
  })
})
