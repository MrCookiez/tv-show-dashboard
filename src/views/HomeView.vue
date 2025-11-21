<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../store/shows'
import Section from '../components/Section/Section.vue'
import HomeHero from '../components/Hero/HomeHero/HomeHero.vue'

const showsStore = useShowsStore()

onMounted(async () => {
  await showsStore.loadAllShows()
})
</script>

<template>
  <div class="home">
    <HomeHero>
      <template #search>
        <div class="placeholder-box">Search Bar Placeholder</div>
      </template>
      <template #filters>
        <div class="placeholder-box">Genre Filters Placeholder</div>
      </template>
    </HomeHero>

    <div class="container main-content">
      <div v-if="showsStore.loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading library...</p>
      </div>

      <div v-else-if="showsStore.error" class="error-container">
        <p>Unable to load shows. {{ showsStore.error }}</p>
      </div>

      <!-- Main Content: List of Genre Sections -->
      <div v-else-if="showsStore.genreGroups.length" class="genre-sections-list">
        <Section
          v-for="group in showsStore.genreGroups"
          :key="group.genre"
          :title="group.genre"
          :shows="group.shows"
        />
      </div>

      <div v-else class="empty-state">
        <p>No shows found.</p>
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
  gap: var(--spacing-12); /* Adds consistent space between sections */
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

.placeholder-box {
  border: 1px dashed var(--color-border);
  padding: var(--spacing-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.5);
}
</style>
