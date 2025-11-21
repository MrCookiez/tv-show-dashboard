<script setup lang="ts">
import Card from '../Card/Card.vue'
import type { Show } from '../../types/shows'

defineProps<{
  shows: Show[]
  searchQuery: string
  selectedGenre: string
}>()

defineEmits<{
  (e: 'clear'): void
}>()
</script>

<template>
  <div class="search-results">
    <div class="results-header">
      <h3>
        {{ shows.length }} results
        <span v-if="selectedGenre !== 'All'"
          >in <strong>{{ selectedGenre }}</strong></span
        >
        <span v-if="searchQuery"
          >for "<strong>{{ searchQuery }}</strong
          >"</span
        >
      </h3>

      <button class="clear-btn" @click="$emit('clear')">✕ Clear Filters</button>
    </div>

    <div v-if="shows.length" class="shows-grid">
      <Card v-for="show in shows" :key="show.id" :show="show" />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-results">
      <p>No shows found matching your criteria.</p>
    </div>
  </div>
</template>

<style scoped>
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.results-header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
}

.results-header strong {
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-primary);
  color: var(--color-brand-surface);
}

.clear-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: color 0.2s;
  font-size: var(--font-size-sm);
}

.clear-btn:hover {
  color: var(--color-brand-secondary);
  text-decoration: underline;
}

/* Grid Layout */
.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-4);
  width: 100%;
}

.empty-results {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--color-text-secondary);
  background: var(--color-surface-dim);
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
}

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
