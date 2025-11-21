<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { debounce } from 'lodash'
import { useShowsStore } from '../store/shows'
import { filterShowsByGenre } from '../utils/shows' // Importing util for consistency
import Section from '../components/Section/Section.vue'
import SearchResult from '../components/SearchResult/SearchResult.vue'
import HomeHero from '../components/Hero/HomeHero/HomeHero.vue'
import SearchBar from '../components/SearchBar/SearchBar.vue'
import GenreFilter from '../components/GenreFilter/GenreFilter.vue'

const showsStore = useShowsStore()

// --- Local State for UI Inputs ---
const localSearchQuery = ref('')
const selectedGenre = ref('All')

// Debounce the store search action
const debouncedStoreSearch = debounce((query: string) => {
  showsStore.search(query)
}, 500)

// Watch local input -> Trigger Store Action
watch(localSearchQuery, newQuery => {
  const trimmed = newQuery.trim()

  if (trimmed.length >= 3) {
    debouncedStoreSearch(trimmed)
  } else {
    // If user clears input or it's too short, clear store search state
    if (showsStore.searchQuery) {
      showsStore.clearSearch()
    }
  }
})

// --- Computed Logic ---

const isSearchActive = computed(() => {
  const hasValidQuery = localSearchQuery.value.trim().length >= 3
  const hasGenreFilter = selectedGenre.value !== 'All'
  return hasValidQuery || hasGenreFilter
})

const filteredShows = computed(() => {
  // Case A: Active Search Query (Server-side results from Store)
  if (localSearchQuery.value.trim().length >= 3) {
    let results = showsStore.searchResults

    // Apply client-side genre filter on top of search results
    if (selectedGenre.value !== 'All') {
      results = filterShowsByGenre(results, selectedGenre.value)
    }
    return results
  }

  // Case B: Genre Filter Only (Local filtering of "All Shows")
  if (selectedGenre.value !== 'All' && showsStore.hasShows) {
    return filterShowsByGenre(showsStore.shows, selectedGenre.value)
  }

  return []
})

// Available genres for filter
const availableGenres = computed(() => {
  return showsStore.genreGroups.map(g => g.genre)
})

// --- Actions ---
const clearFilters = () => {
  localSearchQuery.value = ''
  selectedGenre.value = 'All'
  showsStore.clearSearch()
}

onMounted(async () => {
  await showsStore.loadAllShows()
})
</script>

<template>
  <div class="home">
    <HomeHero>
      <template #search>
        <SearchBar v-model="localSearchQuery" />
      </template>
      <template #filters>
        <GenreFilter v-model="selectedGenre" :genres="availableGenres" />
      </template>
    </HomeHero>

    <div class="container main-content">
      <!-- Initial Library Loading State -->
      <!-- We check 'loading' AND 'not searching' to differentiate initial load vs search load -->
      <div v-if="showsStore.loading && !showsStore.isSearching" class="loading-container">
        <div class="spinner"></div>
        <p>Loading library...</p>
      </div>

      <!-- Global Error State -->
      <div v-else-if="showsStore.error && !showsStore.isSearching" class="error-container">
        <p>Unable to load shows. {{ showsStore.error }}</p>
      </div>

      <!-- VIEW A: Search Results (Active if Query >= 3 chars OR Genre selected) -->
      <div v-else-if="isSearchActive">
        <!-- Search Specific Loading State -->
        <div
          v-if="showsStore.loading && showsStore.isSearching"
          class="loading-container search-loading"
        >
          <div class="spinner"></div>
          <p>Searching TVMaze...</p>
        </div>

        <!-- Results Component -->
        <SearchResult
          v-else
          :shows="filteredShows"
          :search-query="localSearchQuery"
          :selected-genre="selectedGenre"
          @clear="clearFilters"
        />
      </div>

      <!-- VIEW B: Browse by Genre (Default) -->
      <div v-else-if="showsStore.genreGroups.length" class="genre-sections-list">
        <Section
          v-for="group in showsStore.genreGroups"
          :key="group.genre"
          :title="group.genre"
          :shows="group.shows"
        />
      </div>

      <!-- Empty State (No API Data) -->
      <div v-else class="empty-state">
        <p>No shows found in library.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.main-content {
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-12);
}

.genre-sections-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
}

/* Loading / States */
.loading-container,
.error-container,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  color: var(--color-text-secondary);
  text-align: center;
  min-height: 400px;
}

/* Specific height for search loading to prevent layout jumpiness */
.search-loading {
  min-height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-surface-dim);
  border-top-color: var(--color-brand-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-4);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
