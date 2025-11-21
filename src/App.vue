<script setup lang="ts">
import './assets/styles/reset.css'
import './assets/styles/theme.css'
import './assets/styles/global.css'
</script>

<template>
  <div id="app">
    <nav class="demo-nav">
      <div class="container">
        <RouterLink to="/">Home (All Shows)</RouterLink>
        <RouterLink to="/show/169">Details (Breaking Bad)</RouterLink>
        <RouterLink to="/search">Search (Game of Thrones)</RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}

.demo-nav {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.demo-nav .container {
  display: flex;
  gap: var(--spacing-6);
}

.demo-nav a {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.demo-nav a:hover {
  color: var(--color-brand-primary);
  background-color: var(--color-surface-dim);
}

.demo-nav a.router-link-active {
  color: var(--color-brand-primary);
  background-color: var(--color-surface-dim);
}

@media (max-width: 768px) {
  .demo-nav .container {
    flex-direction: column;
    gap: var(--spacing-2);
  }
}
</style>
