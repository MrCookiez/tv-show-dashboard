<script setup lang="ts"></script>

<template>
  <div class="about">
    <div class="container">
      <h1>About TV Show Dashboard</h1>

      <section class="content-section">
        <h2>Overview</h2>
        <p>
          TV Show Dashboard is a modern web application built to explore and discover TV shows.
          Browse shows by genre, search for your favorites, and view detailed information about each
          show.
        </p>
      </section>

      <section class="content-section">
        <h2>Features</h2>
        <ul>
          <li>Browse shows organized by genre</li>
          <li>Horizontal scrolling lists for easy navigation</li>
          <li>Search shows by name</li>
          <li>Filter by genre</li>
          <li>View detailed show information</li>
          <li>Responsive design for all devices</li>
          <li>Dark and light mode support</li>
        </ul>
      </section>

      <section class="content-section">
        <h2>Technology</h2>
        <p>Built with modern web technologies:</p>
        <ul>
          <li><strong>Vue 3</strong> - Progressive JavaScript framework</li>
          <li><strong>TypeScript</strong> - Type-safe development</li>
          <li><strong>Pinia</strong> - State management</li>
          <li><strong>Vue Router</strong> - Client-side routing</li>
          <li><strong>Zod</strong> - Runtime validation</li>
          <li><strong>Vite</strong> - Fast build tool</li>
          <li><strong>Vitest</strong> - Unit testing</li>
        </ul>
      </section>

      <section class="content-section">
        <h2>Data Source</h2>
        <p>
          All TV show data is provided by the
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            TVMaze API
          </a>
          , a comprehensive database of TV show information.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: var(--spacing-8) 0;
  min-height: 60vh;
}

h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-8);
  color: var(--color-text-primary);
}

.content-section {
  margin-bottom: var(--spacing-8);
}

.content-section:last-child {
  margin-bottom: 0;
}

h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-4);
  color: var(--color-text-primary);
}

p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-4);
}

ul {
  list-style: disc;
  padding-left: var(--spacing-6);
  color: var(--color-text-secondary);
}

li {
  margin-bottom: var(--spacing-2);
  line-height: var(--line-height-relaxed);
}

.link {
  color: var(--color-brand-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--color-brand-primary-hover);
  text-decoration: underline;
}

@media (min-width: 768px) {
  h1 {
    font-size: var(--font-size-4xl);
  }
}
</style>
