<script setup lang="ts"></script>

<template>
  <header class="app-header">
    <div class="container">
      <RouterLink to="/" class="logo"> TV Show Dashboard </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.app-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-4);
  padding-bottom: var(--spacing-4);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.logo:hover {
  color: var(--color-brand-primary);
}

.nav {
  display: flex;
  gap: var(--spacing-6);
}

.nav-link {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-brand-primary);
  background-color: var(--color-surface-dim);
}

.nav-link.router-link-active {
  color: var(--color-brand-primary);
  background-color: var(--color-surface-dim);
}

/* Mobile */
@media (min-width: 768px) {
  .logo {
    font-size: var(--font-size-2xl);
  }
}
</style>
