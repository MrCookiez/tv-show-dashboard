import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Section from './Section.vue'
import Card from '../Card/Card.vue'

// Mock Show Data
const mockShows = [
  {
    id: 1,
    name: 'Show 1',
    rating: { average: 8.5 },
    genres: ['Drama'],
    image: { medium: 'img1.jpg', original: 'img1_orig.jpg' },
    // ... minimalist mock of other required fields
    type: 'Scripted',
    language: 'English',
    status: 'Running',
    runtime: 60,
    averageRuntime: 60,
    premiered: '2022-01-01',
    ended: null,
    officialSite: null,
    schedule: { time: '20:00', days: ['Monday'] },
    weight: 100,
    network: null,
    webChannel: null,
    externals: { tvrage: 0, thetvdb: 0, imdb: '' },
    summary: '',
    updated: 0,
    _links: { self: { href: '' } },
    url: '',
  },
  {
    id: 2,
    name: 'Show 2',
    rating: { average: 7.5 },
    genres: ['Comedy'],
    image: { medium: 'img2.jpg', original: 'img2_orig.jpg' },
    // ... minimalist mock
    type: 'Scripted',
    language: 'English',
    status: 'Running',
    runtime: 30,
    averageRuntime: 30,
    premiered: '2022-01-01',
    ended: null,
    officialSite: null,
    schedule: { time: '20:00', days: ['Monday'] },
    weight: 100,
    network: null,
    webChannel: null,
    externals: { tvrage: 0, thetvdb: 0, imdb: '' },
    summary: '',
    updated: 0,
    _links: { self: { href: '' } },
    url: '',
  },
]

describe('Section', () => {
  it('renders the section title', () => {
    const wrapper = mount(Section, {
      props: {
        title: 'Trending Now',
        shows: mockShows,
      },
      global: {
        stubs: {
          Swiper: { template: '<div><slot /></div>' },
          SwiperSlide: { template: '<div><slot /></div>' },
        },
      },
    })
    expect(wrapper.find('.section-title').text()).toBe('Trending Now')
  })

  it('emits "viewAll" event when button is clicked', async () => {
    const wrapper = mount(Section, {
      props: {
        title: 'Drama',
        shows: mockShows,
      },
      global: {
        stubs: {
          Swiper: { template: '<div><slot /></div>' },
          SwiperSlide: { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.find('.view-all-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('viewAll')
  })

  it('renders the correct number of slides', () => {
    const wrapper = mount(Section, {
      props: {
        title: 'Drama',
        shows: mockShows,
      },
      global: {
        // We stub Swiper components to render a simple div with slots
        // This bypasses Swiper's complex JS init which often fails in JSDOM
        stubs: {
          Swiper: { template: '<div class="swiper-stub"><slot /></div>' },
          SwiperSlide: { template: '<div class="swiper-slide-stub"><slot /></div>' },
        },
      },
    })

    // Use the imported component definition for robust finding
    const cards = wrapper.findAllComponents(Card)

    expect(cards.length).toBe(2)
    expect(cards[0]?.props('show').name).toBe('Show 1')
    expect(cards[1]?.props('show').name).toBe('Show 2')
  })
})
