import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchResults from './SearchResult.vue'
import type { Show } from '../../types/shows'

describe('SearchResults', () => {
  // We define a full mock object to satisfy the Show interface
  const mockShows: Show[] = [
    {
      id: 1,
      name: 'Show 1',
      genres: [],
      rating: { average: 5 },
      image: null,
      // Required fields to satisfy TypeScript interface
      url: 'http://test.com',
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
      externals: { tvrage: null, thetvdb: null, imdb: null },
      summary: 'Test summary',
      updated: 1600000000,
      _links: { self: { href: 'http://test.com' } },
    },
  ]

  // We stub ShowCard to avoid needing to mock vue-router (which ShowCard uses)
  const globalOptions = {
    stubs: {
      ShowCard: true,
    },
  }

  it('renders the correct result count', () => {
    const wrapper = mount(SearchResults, {
      props: { shows: mockShows, searchQuery: '', selectedGenre: 'All' },
      global: globalOptions,
    })
    expect(wrapper.text()).toContain('1 results')
  })

  it('displays genre in header when selected', () => {
    const wrapper = mount(SearchResults, {
      props: { shows: mockShows, searchQuery: '', selectedGenre: 'Drama' },
      global: globalOptions,
    })
    expect(wrapper.text()).toContain('in Drama')
  })

  it('displays search query in header when present', () => {
    const wrapper = mount(SearchResults, {
      props: { shows: mockShows, searchQuery: 'Breaking', selectedGenre: 'All' },
      global: globalOptions,
    })
    expect(wrapper.text()).toContain('for "Breaking"')
  })

  it('emits clear event when clear button is clicked', async () => {
    const wrapper = mount(SearchResults, {
      props: { shows: mockShows, searchQuery: 'Test', selectedGenre: 'All' },
      global: globalOptions,
    })

    await wrapper.find('.clear-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clear')
  })

  it('shows empty state message when no shows provided', () => {
    const wrapper = mount(SearchResults, {
      props: { shows: [], searchQuery: 'Impossible', selectedGenre: 'All' },
      global: globalOptions,
    })

    expect(wrapper.find('.empty-results').exists()).toBe(true)
    expect(wrapper.text()).toContain('No shows found')
  })
})
