<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useShowsStore } from '../store/shows'
import HomeHero from '../components/Hero/HomeHero/HomeHero.vue'
import SearchBar from '../components/SearchBar/SearchBar.vue'
import SearchResults from '../components/SearchResult/SearchResult.vue'
import Section from '../components/Section/Section.vue'
import GenreFilter from '../components/GenreFilter/GenreFilter.vue'

const showsStore = useShowsStore()

// --- Local State ---
const searchQuery = ref('')
const selectedGenre = ref('All')

// --- Computed Logic ---
// 1. Determine if we are in "Search/Filter Mode"
const isSearchActive = computed(() => {
  const hasQuery = searchQuery.value.trim().length > 0
  const hasGenreFilter = selectedGenre.value !== 'All'
  return hasQuery || hasGenreFilter
})

// 2. Filter logic (Client-side filtering)
const filteredShows = computed(() => {
  if (!showsStore.hasShows) return []

  let result = showsStore.shows

  // Filter by Genre
  if (selectedGenre.value !== 'All') {
    result = result.filter(show => show.genres.includes(selectedGenre.value))
  }

  // Filter by Search Query (Case insensitive)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(show => show.name.toLowerCase().includes(query))
  }

  return result
})

// 3. Get available genres for the filter buttons
const availableGenres = computed(() => {
  return showsStore.genreGroups.map(g => g.genre)
})

// --- Actions ---
const clearFilters = () => {
  searchQuery.value = ''
  selectedGenre.value = 'All'
}

onMounted(async () => {
  await showsStore.loadAllShows()
})
</script>

<template>
  <div class="home">
    <HomeHero>
      <template #search>
        <SearchBar v-model="searchQuery" />
      </template>
      <template #filters>
        <GenreFilter v-model="selectedGenre" :genres="availableGenres" />
      </template>
    </HomeHero>

    <div class="container main-content">
      <!-- Loading State -->
      <div v-if="showsStore.loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading library...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="showsStore.error" class="error-container">
        <p>Unable to load shows. {{ showsStore.error }}</p>
      </div>

      <!-- VIEW A: Search Results -->
      <SearchResults
        v-else-if="isSearchActive"
        :shows="filteredShows"
        :search-query="searchQuery"
        :selected-genre="selectedGenre"
        @clear="clearFilters"
      />

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
