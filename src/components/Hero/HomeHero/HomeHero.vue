<script setup lang="ts"></script>

<template>
  <section class="home-hero">
    <div class="container">
      <h1 class="hero-title">Discover TV Shows</h1>
      <p class="hero-subtitle">Search and explore shows by genre</p>

      <!-- Slot for SearchBar component -->
      <div class="hero-content">
        <slot name="search"></slot>
      </div>

      <!-- Slot for GenreFilter component -->
      <div class="hero-filters">
        <slot name="filters"></slot>
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
