import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Section from './Section.vue'
import Card from '../Card/Card.vue'
import { mockShows } from '../../mock/mockData'

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
