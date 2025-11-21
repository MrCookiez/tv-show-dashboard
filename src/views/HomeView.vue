<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../store/shows'
import ShowCard from '../components/Card/Card.vue'

const showsStore = useShowsStore()

onMounted(async () => {
  await showsStore.loadAllShows()
})
</script>

<template>
  <div class="home">
    <div class="container">
      <header class="page-header">
        <h1>All TV Shows</h1>
        <p class="subtitle">Browse our complete collection of TV series.</p>
      </header>

      <div v-if="showsStore.loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading library...</p>
      </div>

      <div v-else-if="showsStore.error" class="error-container">
        <p>Unable to load shows. {{ showsStore.error }}</p>
      </div>

      <div v-else-if="showsStore.hasShows" class="shows-grid">
        <ShowCard v-for="show in showsStore.shows" :key="show.id" :show="show" />
      </div>

      <div v-else class="empty-state">
        <p>No shows found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: var(--spacing-8) 0;
  min-height: 80vh;
}

.page-header {
  margin-bottom: var(--spacing-8);
}

h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-2);
  color: var(--color-text-primary);
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

/* Grid Layout */
.shows-grid {
  display: grid;
  /* Responsive Grid: Min 160px width, fill available space */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-4);
  width: 100%;
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

/* Tablet and Desktop Adjustments */
@media (min-width: 640px) {
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-6);
  }
}
</style>
