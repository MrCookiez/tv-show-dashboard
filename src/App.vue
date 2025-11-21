<script setup lang="ts">
import AppHeader from './components/Layout/AppHeader/AppHeader.vue'
import AppFooter from './components/Layout/AppFooter/AppFooter.vue'

import './assets/styles/reset.css'
import './assets/styles/theme.css'
import './assets/styles/global.css'
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
