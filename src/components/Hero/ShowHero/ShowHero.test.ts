import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowHero from './ShowHero.vue'
import type { Show } from '../../../types/shows'

describe('ShowHero', () => {
  const mockShow: Show = {
    id: 169,
    name: 'Breaking Bad',
    genres: ['Drama', 'Crime', 'Thriller'],
    rating: { average: 9.5 },
    summary: '<p>A high school chemistry teacher diagnosed with cancer turns to cooking meth.</p>',
    premiered: '2008-01-20',
    ended: '2013-09-29',
  } as Show

  it('renders show name', () => {
    const wrapper = mount(ShowHero, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.hero-title').text()).toBe('Breaking Bad')
  })

  it('displays rating', () => {
    const wrapper = mount(ShowHero, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.rating').text()).toContain('9.5')
  })

  it('displays genres', () => {
    const wrapper = mount(ShowHero, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.genres').text()).toBe('Drama, Crime, Thriller')
  })

  it('displays year range', () => {
    const wrapper = mount(ShowHero, {
      props: { show: mockShow },
    })

    expect(wrapper.find('.years').text()).toBe('2008 - 2013')
  })

  it('displays summary without HTML tags', () => {
    const wrapper = mount(ShowHero, {
      props: { show: mockShow },
    })

    const summary = wrapper.find('.hero-summary').text()
    expect(summary).not.toContain('<p>')
    expect(summary).toContain('chemistry teacher')
  })

  it('handles show without rating', () => {
    const showWithoutRating = {
      ...mockShow,
      rating: { average: null },
    }

    const wrapper = mount(ShowHero, {
      props: { show: showWithoutRating },
    })

    expect(wrapper.find('.rating').exists()).toBe(false)
  })

  it('handles show without genres', () => {
    const showWithoutGenres = {
      ...mockShow,
      genres: [],
    }

    const wrapper = mount(ShowHero, {
      props: { show: showWithoutGenres },
    })

    expect(wrapper.find('.genres').exists()).toBe(false)
  })

  it('handles ongoing show without end date', () => {
    const ongoingShow = {
      ...mockShow,
      ended: null,
    }

    const wrapper = mount(ShowHero, {
      props: { show: ongoingShow },
    })

    expect(wrapper.find('.years').text()).toBe('2008 - Present')
  })

  it('truncates long summary', () => {
    const longSummary = 'A'.repeat(300)
    const showWithLongSummary = {
      ...mockShow,
      summary: longSummary,
    }

    const wrapper = mount(ShowHero, {
      props: { show: showWithLongSummary },
    })

    const summary = wrapper.find('.hero-summary').text()
    expect(summary.length).toBeLessThan(210) // 200 chars + "..."
  })
})
