import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllShows, fetchShowById, searchShows } from '../api/shows'
import { groupShowsByGenre, sortShowsByRating } from '../utils/shows'
import type { Show, GenreGroup } from '../types/shows'

export const useShowsStore = defineStore('shows', () => {
  // State
  const shows = ref<Show[]>([])
  const selectedShow = ref<Show | null>(null)
  const searchResults = ref<Show[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  // Computed
  const genreGroups = computed<GenreGroup[]>(() => {
    if (shows.value.length === 0) return []
    return groupShowsByGenre(shows.value)
  })

  const hasShows = computed(() => shows.value.length > 0)

  const hasSearchResults = computed(() => searchResults.value.length > 0)

  const isSearching = computed(() => searchQuery.value.length > 0)

  // Actions
  async function loadAllShows() {
    if (hasShows.value) {
      // Already loaded, no need to fetch again
      return
    }

    loading.value = true
    error.value = null

    try {
      shows.value = await fetchAllShows()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load shows'
      console.error('Error loading shows:', e)
    } finally {
      loading.value = false
    }
  }

  async function loadShowById(id: number) {
    loading.value = true
    error.value = null
    selectedShow.value = null

    try {
      // Check if show exists in store first
      const existingShow = shows.value.find(show => show.id === id)

      if (existingShow) {
        selectedShow.value = existingShow
      } else {
        selectedShow.value = await fetchShowById(id)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load show'
      console.error('Error loading show:', e)
    } finally {
      loading.value = false
    }
  }

  async function search(query: string) {
    searchQuery.value = query

    if (!query.trim()) {
      searchResults.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const results = await searchShows(query)
      searchResults.value = sortShowsByRating(results)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Search failed'
      console.error('Error searching shows:', e)
    } finally {
      loading.value = false
    }
  }

  function clearSearch() {
    searchQuery.value = ''
    searchResults.value = []
  }

  function clearError() {
    error.value = null
  }

  function clearSelectedShow() {
    selectedShow.value = null
  }

  return {
    // State
    shows,
    selectedShow,
    searchResults,
    loading,
    error,
    searchQuery,

    // Computed
    genreGroups,
    hasShows,
    hasSearchResults,
    isSearching,

    // Actions
    loadAllShows,
    loadShowById,
    search,
    clearSearch,
    clearError,
    clearSelectedShow,
  }
})
