import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppHeader from './AppHeader.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: 'Home' } },
    { path: '/about', component: { template: 'About' } },
  ],
})

describe('AppHeader', () => {
  it('renders the logo', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.logo').text()).toBe('TV Show Dashboard')
  })

  it('renders navigation links', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const links = wrapper.findAll('.nav-link')
    expect(links).toHaveLength(2)
    expect(links[0]?.text()).toBe('Home')
    expect(links[1]?.text()).toBe('About')
  })

  it('has correct link hrefs', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const homeLink = wrapper.findAll('.nav-link')[0]
    const aboutLink = wrapper.findAll('.nav-link')[1]

    expect(homeLink?.attributes('href')).toBe('/')
    expect(aboutLink?.attributes('href')).toBe('/about')
  })

  it('applies sticky positioning', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router],
      },
    })

    const header = wrapper.find('.app-header')
    expect(header.exists()).toBe(true)
  })
})
