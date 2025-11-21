import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from './Card.vue'

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('ShowCard', () => {
  const mockShow = {
    id: 123,
    name: 'Breaking Bad',
    type: 'Scripted',
    language: 'English',
    genres: ['Drama', 'Crime', 'Thriller'],
    status: 'Ended',
    runtime: 60,
    averageRuntime: 60,
    premiered: '2008-01-20',
    ended: '2013-09-29',
    officialSite: 'http://www.amc.com/shows/breaking-bad',
    schedule: { time: '22:00', days: ['Sunday'] },
    rating: { average: 9.5 },
    weight: 99,
    network: {
      id: 1,
      name: 'AMC',
      country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
      officialSite: null,
    },
    webChannel: null,
    externals: { tvrage: 18164, thetvdb: 81189, imdb: 'tt0903747' },
    image: {
      medium: 'https://example.com/breaking-bad-medium.jpg',
      original: 'https://example.com/breaking-bad-original.jpg',
    },
    summary: '<p>Detailed summary here</p>',
    updated: 1600000000,
    _links: { self: { href: '' }, previousepisode: { href: '' } },
    url: 'http://tvmaze.com/shows/123/breaking-bad',
  }

  it('renders the show title', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.title').text()).toBe('Breaking Bad')
  })

  it('renders the rating correctly', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.rating').text()).toContain('9.5')
  })

  it('renders the first two genres joined by a separator', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.genres').text()).toBe('Drama • Crime')
  })

  it('renders the image with the correct src', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/breaking-bad-medium.jpg')
    expect(img.attributes('alt')).toBe('Breaking Bad')
  })

  it('uses a placeholder if no image is provided', () => {
    const showWithoutImage = { ...mockShow, image: null }

    const wrapper = mount(ShowCard, {
      props: { show: showWithoutImage },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toContain('placehold.co')
  })

  it('navigates to details page on click', async () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    await wrapper.trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/show/123')
  })

  it('navigates to details page on Enter key (accessibility)', async () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    })

    await wrapper.trigger('keydown.enter')

    expect(pushMock).toHaveBeenCalledWith('/show/123')
  })

  it('handles image loading state correctly', async () => {
    const wrapper = mount(ShowCard, {
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
