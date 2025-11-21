<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <p class="footer-text">© {{ currentYear }} TV Show Dashboard</p>
      <p class="footer-text">
        Powered by
        <a
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          TVMaze API
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.app-footer .container {
  padding-top: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  text-align: center;
}

.footer-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2);
}

.footer-text:last-child {
  margin-bottom: 0;
}

.footer-link {
  color: var(--color-brand-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-brand-primary-hover);
  text-decoration: underline;
}
</style>
