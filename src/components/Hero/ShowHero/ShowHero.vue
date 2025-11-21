<script setup lang="ts">
import type { Show } from '../../../types/shows'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  show: Show
}>()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <section class="show-hero">
    <div class="container">
      <h1 class="hero-title">{{ show.name }}</h1>

      <div class="hero-meta">
        <span v-if="show.rating.average" class="rating"> ⭐ {{ show.rating.average }} </span>
        <span v-if="show.genres.length" class="genres">
          {{ show.genres.join(', ') }}
        </span>
        <span v-if="show.premiered && show.ended" class="years">
          {{ show.premiered.split('-')[0] }} - {{ show.ended.split('-')[0] }}
        </span>
        <span v-else-if="show.premiered" class="years">
          {{ show.premiered.split('-')[0] }} - Present
        </span>
      </div>

      <p v-if="show.summary" class="hero-summary">
        {{ show.summary.replace(/<[^>]*>/g, '').substring(0, 200) }}...
      </p>

      <button @click="goBack" class="back-btn">← Back to Home</button>
    </div>
  </section>
</template>

<style scoped>
.show-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-8) 0;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-base);
}

.rating {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.genres {
  color: var(--color-text-secondary);
}

.years {
  color: var(--color-text-secondary);
}

.hero-summary {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 800px;
}

/* Mobile */
@media (min-width: 768px) {
  .show-hero {
    padding: var(--spacing-12) 0;
  }

  .hero-title {
    font-size: var(--font-size-4xl);
  }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 300px;
  margin: var(--spacing-8) auto;
  width: fit-content;
}

.back-btn:hover {
  background-color: var(--color-surface-dim);
  border-color: var(--color-text-secondary);
}
</style>
