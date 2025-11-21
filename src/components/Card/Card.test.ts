import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'
import { mockShow } from '../../mock/mockData'

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('Card', () => {
  it('renders the show title', () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.title').text()).toBe('Breaking Bad')
  })

  it('renders the rating correctly', () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.rating').text()).toContain('9.5')
  })

  it('renders the first two genres joined by a separator', () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.genres').text()).toBe('Drama • Crime')
  })

  it('renders the image with the correct src', () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/breaking-bad-medium.jpg')
    expect(img.attributes('alt')).toBe('Breaking Bad')
  })

  it('uses a placeholder if no image is provided', () => {
    const showWithoutImage = { ...mockShow, image: null }

    const wrapper = mount(Card, {
      props: { show: showWithoutImage },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toContain('placehold.co')
  })

  it('navigates to details page on click', async () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    await wrapper.trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/show/123')
  })

  it('navigates to details page on Enter key (accessibility)', async () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    await wrapper.trigger('keydown.enter')

    expect(pushMock).toHaveBeenCalledWith('/show/123')
  })

  it('handles image loading state correctly', async () => {
    const wrapper = mount(Card, {
      props: { show: mockShow },
    })

    // 1. Initial State: Skeleton exists, image is not "loaded"
    expect(wrapper.find('.skeleton-loader').exists()).toBe(true)
    expect(wrapper.find('img').classes()).not.toContain('is-loaded')

    // 2. Simulate Image Load Event
    await wrapper.find('img').trigger('load')

    // 3. Loaded State: Skeleton removed, image has "loaded" class
    expect(wrapper.find('.skeleton-loader').exists()).toBe(false)
    expect(wrapper.find('img').classes()).toContain('is-loaded')
  })
})
