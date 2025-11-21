<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  genres: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectGenre = (genre: string) => {
  emit('update:modelValue', genre)
}

// Ensure "All" is always first, followed by the API genres
const displayGenres = computed(() => {
  return ['All', ...props.genres]
})
</script>

<template>
  <div class="genre-filters">
    <button
      v-for="genre in displayGenres"
      :key="genre"
      class="genre-pill"
      :class="{ active: modelValue === genre }"
      @click="selectGenre(genre)"
      :aria-pressed="modelValue === genre"
    >
      {{ genre }}
    </button>
  </div>
</template>

<style scoped>
.genre-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  justify-content: center;
}

.genre-pill {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: 9999px; /* Pill shape */
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.genre-pill:hover {
  border-color: var(--color-text-secondary);
  background-color: var(--color-surface-dim);
}

/* Active State */
.genre-pill.active {
  background-color: var(--color-text-secondary); /* Dark grey from screenshot */
  color: var(--color-surface);
  border-color: var(--color-text-secondary);
}
</style>
