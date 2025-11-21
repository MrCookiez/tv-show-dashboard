<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../store/shows'

const route = useRoute()
const showsStore = useShowsStore()

// Use Breaking Bad (ID 169) as default demo
const showId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : 169
})

onMounted(async () => {
  await showsStore.loadShowById(showId.value)
})

// Watch for route changes
watch(
  () => route.params.id,
  async newId => {
    if (newId) {
      await showsStore.loadShowById(Number(newId))
    }
  }
)
</script>

<template>
  <div class="show-details">
    <div class="container">
      <h1>Show Details Page - Single Show Data</h1>
      <p>Show ID: {{ showId }} {{ showId === 169 ? '(Breaking Bad - Demo)' : '' }}</p>

      <!-- Loading State -->
      <div v-if="showsStore.loading">
        <p>Loading show details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="showsStore.error">
        <p>Error: {{ showsStore.error }}</p>
      </div>

      <!-- Data Visualization -->
      <div v-else-if="showsStore.selectedShow">
        <h2>Selected Show: {{ showsStore.selectedShow.name }}</h2>
        <pre>{{ JSON.stringify(showsStore.selectedShow, null, 2) }}</pre>
      </div>

      <div style="margin-top: 2rem">
        <p style="color: var(--color-text-secondary)">💡 Try different show IDs in the URL:</p>
        <ul style="list-style: disc; padding-left: 1.5rem; color: var(--color-text-secondary)">
          <li>/show/169 - Breaking Bad</li>
          <li>/show/82 - Game of Thrones</li>
          <li>/show/1 - Under the Dome</li>
          <li>/show/73 - The Walking Dead</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-details {
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

ul {
  margin-top: var(--spacing-2);
}

ul li {
  margin-bottom: var(--spacing-1);
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
