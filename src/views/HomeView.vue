<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../store/shows'

const showsStore = useShowsStore()

onMounted(async () => {
  await showsStore.loadAllShows()
})
</script>

<template>
  <div class="home">
    <div class="container">
      <h1>Home Page - All Shows Data</h1>

      <!-- Loading State -->
      <div v-if="showsStore.loading">
        <p>Loading shows...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="showsStore.error">
        <p>Error: {{ showsStore.error }}</p>
      </div>

      <!-- Data Visualization -->
      <div v-else-if="showsStore.hasShows">
        <h2>Stats</h2>
        <pre>{{
          JSON.stringify(
            {
              totalShows: showsStore.shows.length,
              totalGenres: showsStore.genreGroups.length,
              genres: showsStore.genreGroups.map(g => ({
                genre: g.genre,
                showCount: g.shows.length,
              })),
            },
            null,
            2
          )
        }}</pre>

        <h2>Genre Groups (First 2)</h2>
        <pre>{{ JSON.stringify(showsStore.genreGroups.slice(0, 2), null, 2) }}</pre>

        <h2>Sample Shows (First 5)</h2>
        <pre>{{ JSON.stringify(showsStore.shows.slice(0, 5), null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: var(--spacing-8) 0;
}

h1 {
  margin-bottom: var(--spacing-6);
}

h2 {
  margin-top: var(--spacing-8);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-xl);
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
