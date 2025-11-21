<script setup lang="ts"></script>

<template>
  <div class="about">
    <h1>About the app</h1>
    <h2>📺 Welcome to the TV Show Dashboard</h2>
    <p>
      The **TV Show Dashboard** is a single-page application built to offer a seamless and intuitive
      experience for discovering and exploring television shows. Using the extensive data provided
      by the <a href="http://www.tvmaze.com/api" target="_blank">TVMaze API</a>, this application
      organizes a vast catalog of series, allowing users to quickly find what they're looking for.
    </p>

    <h2>✨ Key Features</h2>
    <h3>Categorized and Sorted Lists</h3>
    <p>
      Shows are intelligently **categorized by their genre** (e.g., Drama, Comedy, Sports) and
      presented in clean, **horizontally scrollable lists**. Within each genre, the shows are then
      **sorted by their rating** to highlight the most popular and critically acclaimed series
      first. This design choice ensures efficient browsing across diverse categories.
    </p>

    <h3>Detailed Show Information</h3>
    <p>
      Selecting any show takes you to a dedicated **Show Details page**, where you can explore
      comprehensive information including the synopsis, cast, ratings, and more.
    </p>

    <h3>Quick Search Functionality</h3>
    <p>
      A responsive **search bar** is available across the application, allowing users to
      effortlessly find shows by name, providing instant results as they type.
    </p>

    <h2>🛠️ Under the Hood: Technical Excellence</h2>
    <p>
      This dashboard serves as a demonstration of modern, maintainable, and high-quality front-end
      development. It is engineered with a strong focus on:
    </p>
    <ul>
      <li>
        **Clean and Reusable Code:** Leveraging best practices and **Programming Patterns** with
        **VueJS 3** and **TypeScript** for robust component architecture.
      </li>
      <li>
        **State Management:** Utilizing **PiniaJS** for predictable and efficient application state
        handling.
      </li>
      <li>
        **Design and Responsiveness:** Implementing a simple yet eye-catching UI with **Scoped CSS**
        and a focus on **Responsive Design** to ensure a flawless experience on desktop, tablet, and
        **mobile devices**.
      </li>
      <li>
        **Accessibility (A11Y):** Built with accessibility standards in mind to ensure the
        application is usable by the broadest possible audience.
      </li>
    </ul>

    <h3>Technology Stack</h3>
    <p>
      The application is powered by **VueJS 3** and **Node 24v**, supported by essential tooling
      such as **Vite** for fast development, **Vue Router** for navigation, **Vue Test Utils (VTU)**
      and **Vitest** for comprehensive unit testing, and data validation libraries like **Zod** and
      **JoiJS** for data integrity.
    </p>
  </div>
</template>

<style scoped>
.about {
  padding: var(--spacing-8) 0;
}

h1 {
  margin-bottom: var(--spacing-2);
}
</style>
