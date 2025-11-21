<script setup lang="ts">
import SearchBar from '../../SearchBar/SearchBar.vue'
import GenreFilter from '../../GenreFilter/GenreFilter.vue'

defineProps<{
  searchQuery: string
  selectedGenre: string
  genres: string[]
}>()

defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedGenre', value: string): void
}>()
</script>

<template>
  <section class="home-hero">
    <div class="container">
      <h1 class="hero-title">Discover TV Shows</h1>
      <p class="hero-subtitle">Search and explore shows by genre</p>

      <!-- Search Bar (Proxied v-model) -->
      <div class="hero-content">
        <SearchBar
          :model-value="searchQuery"
          @update:model-value="$emit('update:searchQuery', $event)"
        />
      </div>

      <!-- Genre Filter (Proxied v-model) -->
      <div class="hero-filters">
        <GenreFilter
          :model-value="selectedGenre"
          :genres="genres"
          @update:model-value="$emit('update:selectedGenre', $event)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-8) 0;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
  text-align: center;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-6);
}

.hero-content {
  margin-bottom: var(--spacing-4);
  display: flex;
  justify-content: center;
}

.hero-filters {
  display: flex;
  justify-content: center;
}

/* Mobile */
@media (min-width: 768px) {
  .home-hero {
    padding: var(--spacing-12) 0;
  }

  .hero-title {
    font-size: var(--font-size-4xl);
  }
}
</style>
