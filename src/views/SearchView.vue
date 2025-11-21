<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../store/shows'

const showsStore = useShowsStore()

// Demo search query - "Game of Thrones"
const demoQuery = 'Game of Thrones'

onMounted(async () => {
  await showsStore.search(demoQuery)
})
</script>

<template>
  <div class="search">
    <div class="container">
      <h1>Search Page - Search Results Data</h1>
      <p>Demo search query: "{{ demoQuery }}"</p>

      <!-- Loading State -->
      <div v-if="showsStore.loading">
        <p>Searching...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="showsStore.error">
        <p>Error: {{ showsStore.error }}</p>
      </div>

      <!-- Data Visualization -->
      <div v-else>
        <h2>Search Stats</h2>
        <pre>{{
          JSON.stringify(
            {
              query: showsStore.searchQuery,
              resultsCount: showsStore.searchResults.length,
              hasResults: showsStore.hasSearchResults,
            },
            null,
            2
          )
        }}</pre>

        <div v-if="showsStore.hasSearchResults">
          <h2>Search Results (Sorted by Rating)</h2>
          <pre>{{ JSON.stringify(showsStore.searchResults, null, 2) }}</pre>
        </div>

        <div v-else>
          <h2>No Results</h2>
          <p>No shows found for "{{ demoQuery }}"</p>
        </div>
      </div>

      <div style="margin-top: 2rem">
        <p style="color: var(--color-text-secondary)">
          💡 Modify the component to try different search queries
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  padding: var(--spacing-8) 0;
}

h1 {
  margin-bottom: var(--spacing-2);
}

h2 {
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-xl);
}

p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-4);
}

pre {
  background-color: var(--color-surface);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
  font-size: var(--font-size-sm);
  line-height: 1.5;
  border: 1px solid var(--color-border);
}
</style>
