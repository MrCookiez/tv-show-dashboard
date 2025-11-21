<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { debounce } from 'lodash'
import { useShowsStore } from '../store/shows'
import { filterShowsByGenre } from '../utils/shows'
import Section from '../components/Section/Section.vue'
import SearchResults from '../components/SearchResults/SearchResults.vue'
import HomeHero from '../components/Hero/HomeHero/HomeHero.vue'

const showsStore = useShowsStore()

// --- Local State for UI Inputs ---
const localSearchQuery = ref('')
const selectedGenre = ref('All')

// --- Store Integration ---
const debouncedStoreSearch = debounce((query: string) => {
  showsStore.search(query)
}, 500)

watch(localSearchQuery, newQuery => {
  const trimmed = newQuery.trim()
  if (trimmed.length >= 3) {
    debouncedStoreSearch(trimmed)
  } else {
    if (showsStore.searchQuery) showsStore.clearSearch()
  }
})

// --- Computed Logic ---
const isSearchActive = computed(() => {
  const hasValidQuery = localSearchQuery.value.trim().length >= 3
  const hasGenreFilter = selectedGenre.value !== 'All'
  return hasValidQuery || hasGenreFilter
})

const filteredShows = computed(() => {
  if (localSearchQuery.value.trim().length >= 3) {
    let results = showsStore.searchResults
    if (selectedGenre.value !== 'All') {
      results = filterShowsByGenre(results, selectedGenre.value)
    }
    return results
  }
  if (selectedGenre.value !== 'All' && showsStore.hasShows) {
    return filterShowsByGenre(showsStore.shows, selectedGenre.value)
  }
  return []
})

const availableGenres = computed(() => showsStore.genreGroups.map(g => g.genre))

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
    <!-- Smart Hero: Handles Input & Filters -->
    <HomeHero
      v-model:searchQuery="localSearchQuery"
      v-model:selectedGenre="selectedGenre"
      :genres="availableGenres"
    />

    <div class="container main-content">
      <!-- Loading & Error States -->
      <div v-if="showsStore.loading && !showsStore.isSearching" class="loading-container">
        <div class="spinner"></div>
        <p>Loading library...</p>
      </div>

      <div v-else-if="showsStore.error && !showsStore.isSearching" class="error-container">
        <p>Unable to load shows. {{ showsStore.error }}</p>
      </div>

      <!-- VIEW A: Search Results -->
      <div v-else-if="isSearchActive">
        <div
          v-if="showsStore.loading && showsStore.isSearching"
          class="loading-container search-loading"
        >
          <div class="spinner"></div>
          <p>Searching TVMaze...</p>
        </div>

        <SearchResults
          v-else
          :shows="filteredShows"
          :search-query="localSearchQuery"
          :selected-genre="selectedGenre"
          @clear="clearFilters"
        />
      </div>

      <!-- VIEW B: Browse by Genre -->
      <div v-else-if="showsStore.genreGroups.length" class="genre-sections-list">
        <Section
          v-for="group in showsStore.genreGroups"
          :key="group.genre"
          :title="group.genre"
          :shows="group.shows"
        />
      </div>

      <!-- Empty State -->
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
