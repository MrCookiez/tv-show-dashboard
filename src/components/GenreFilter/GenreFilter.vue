<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    genres: string[]
    limit?: number // Control how many items show before "See all"
  }>(),
  {
    limit: 8, // Default to 8 if not specified
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isExpanded = ref(false)

const selectGenre = (genre: string) => {
  emit('update:modelValue', genre)
}

// All available options including 'All'
const allOptions = computed(() => {
  return ['All', ...props.genres]
})

// Subset to display based on limit and expansion state
const visibleOptions = computed(() => {
  if (isExpanded.value) return allOptions.value
  return allOptions.value.slice(0, props.limit)
})

// Only show the toggle button if we have more items than the limit
const showToggle = computed(() => {
  return allOptions.value.length > props.limit
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="genre-filters">
    <button
      v-for="genre in visibleOptions"
      :key="genre"
      class="genre-pill"
      :class="{ active: modelValue === genre }"
      @click="selectGenre(genre)"
      :aria-pressed="modelValue === genre"
    >
      {{ genre }}
    </button>

    <!-- Toggle Button -->
    <button v-if="showToggle" class="genre-pill toggle-btn" @click="toggleExpand">
      {{ isExpanded ? 'See less' : '+ more' }}
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
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.genre-pill:hover {
  border-color: var(--color-text-secondary);
  background-color: var(--color-surface-dim);
}

/* Active State */
.genre-pill.active {
  background-color: var(--color-text-primary);
  color: var(--color-surface);
  border-color: var(--color-text-primary);
}

/* Toggle Button Specific Style */
.toggle-btn {
  color: var(--color-brand-secondary);
  border-color: var(--color-brand-secondary);
  font-weight: var(--font-weight-semibold);
}

.toggle-btn:hover {
  background-color: var(--color-brand-secondary);
  color: var(--color-text-on-brand);
}
</style>
