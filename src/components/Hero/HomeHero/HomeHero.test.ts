import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from './HomeHero.vue'
import SearchBar from '../../SearchBar/SearchBar.vue'
import GenreFilter from '../../GenreFilter/GenreFilter.vue'

describe('HomeHero', () => {
  const defaultProps = {
    searchQuery: '',
    selectedGenre: 'All',
    genres: ['Drama', 'Comedy'],
  }

  it('renders the title and subtitle', () => {
    const wrapper = mount(HomeHero, {
      props: defaultProps,
    })

    expect(wrapper.find('.hero-title').text()).toBe('Discover TV Shows')
    expect(wrapper.find('.hero-subtitle').text()).toBe('Search and explore shows by genre')
  })

  it('renders the SearchBar with correct props', () => {
    const wrapper = mount(HomeHero, {
      props: { ...defaultProps, searchQuery: 'Test Query' },
    })

    const searchBar = wrapper.findComponent(SearchBar)
    expect(searchBar.exists()).toBe(true)
    expect(searchBar.props('modelValue')).toBe('Test Query')
  })

  it('renders the GenreFilter with correct props', () => {
    const wrapper = mount(HomeHero, {
      props: { ...defaultProps, selectedGenre: 'Drama', genres: ['Drama', 'Sci-Fi'] },
    })

    const genreFilter = wrapper.findComponent(GenreFilter)
    expect(genreFilter.exists()).toBe(true)
    expect(genreFilter.props('modelValue')).toBe('Drama')
    expect(genreFilter.props('genres')).toEqual(['Drama', 'Sci-Fi'])
  })

  it('emits update:searchQuery when SearchBar emits update', async () => {
    const wrapper = mount(HomeHero, {
      props: defaultProps,
    })

    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.vm.$emit('update:modelValue', 'New Search')

    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()
    expect(wrapper.emitted('update:searchQuery')?.[0]).toEqual(['New Search'])
  })

  it('emits update:selectedGenre when GenreFilter emits update', async () => {
    const wrapper = mount(HomeHero, {
      props: defaultProps,
    })

    const genreFilter = wrapper.findComponent(GenreFilter)
    await genreFilter.vm.$emit('update:modelValue', 'Comedy')

    expect(wrapper.emitted('update:selectedGenre')).toBeTruthy()
    expect(wrapper.emitted('update:selectedGenre')?.[0]).toEqual(['Comedy'])
  })
})
