<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const statusCode = computed(() => {
  const code = route.query.code
  return code ? Number(code) : 404
})

const message = computed(() => {
  const msg = route.query.message
  if (typeof msg === 'string' && msg) {
    return msg
  }
  return getDefaultMessage(statusCode.value)
})

function getDefaultMessage(code: number): string {
  switch (code) {
    case 404:
      return 'The page or resource you are looking for could not be found.'
    case 500:
      return 'Something went wrong on our end. Please try again later.'
    case 503:
      return 'The service is temporarily unavailable. Please try again later.'
    default:
      return 'An unexpected error occurred.'
  }
}

const title = computed(() => {
  switch (statusCode.value) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Internal Server Error'
    case 503:
      return 'Service Unavailable'
    default:
      return 'Error'
  }
})

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">
        <svg
          v-if="statusCode === 404"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <div class="error-content">
        <h1 class="error-code">{{ statusCode }}</h1>
        <h2 class="error-title">{{ title }}</h2>
        <p class="error-message">{{ message }}</p>

        <div class="error-actions">
          <button @click="goHome" class="btn btn-primary">Go Home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  padding: var(--spacing-8);
}

.error-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--spacing-6);
  color: var(--color-brand-secondary);
  opacity: 0.8;
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

.error-content {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-10);
}

.error-code {
  font-size: 72px;
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-primary);
  margin: 0 0 var(--spacing-2);
  line-height: 1;
}

.error-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3);
}

.error-message {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--spacing-8);
}

.error-actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--color-brand-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-brand-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: var(--color-surface-dim);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-surface);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .error-icon {
    width: 80px;
    height: 80px;
  }

  .error-code {
    font-size: 56px;
  }

  .error-title {
    font-size: var(--font-size-xl);
  }

  .error-message {
    font-size: var(--font-size-base);
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
