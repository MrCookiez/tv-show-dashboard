<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../store/shows'
import { stripHtml } from '../utils/shows'
import ShowHero from '../components/Hero/ShowHero/ShowHero.vue'

const route = useRoute()
const showsStore = useShowsStore()

const showId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : 169 // Default fallback
})

const loadShow = async (id: number) => {
  await showsStore.loadShowById(id)
  // Scroll to top for better UX when switching shows
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadShow(showId.value)
})

watch(
  () => route.params.id,
  newId => {
    if (newId) loadShow(Number(newId))
  }
)

// --- Helpers ---
const formattedPremiered = computed(() => {
  if (!showsStore.selectedShow?.premiered) return 'Unknown'
  return new Date(showsStore.selectedShow.premiered).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const networkName = computed(() => {
  const show = showsStore.selectedShow
  return show?.network?.name || show?.webChannel?.name || 'N/A'
})

const cleanSummary = computed(() => {
  return stripHtml(showsStore.selectedShow?.summary || 'No summary available.')
})
</script>

<template>
  <div class="show-details-page">
    <!-- Loading State -->
    <div v-if="showsStore.loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="showsStore.error" class="error-state">
      <h2>Oops!</h2>
      <p>{{ showsStore.error }}</p>
    </div>

    <!-- Content -->
    <transition name="fade" appear>
      <div v-if="showsStore.selectedShow" class="content-wrapper">
        <!-- 1. Hero Section (Grey Header) -->
        <ShowHero :show="showsStore.selectedShow" />

        <!-- 2. Main Details Body -->
        <div class="container main-body">
          <!-- Left Column: Poster & Actions -->
          <aside class="sidebar">
            <div class="poster-wrapper">
              <img
                v-if="showsStore.selectedShow.image"
                :src="showsStore.selectedShow.image.original"
                :alt="showsStore.selectedShow.name"
                class="poster-image"
              />
              <div v-else class="poster-placeholder">No Poster</div>
            </div>
          </aside>

          <!-- Right Column: Info Grid -->
          <div class="details-grid">
            <!-- Summary Card (Full Width) -->
            <div class="info-card full-width">
              <h3 class="label">SUMMARY</h3>
              <p class="text-content">{{ cleanSummary }}</p>
            </div>

            <!-- Info Cards Grid -->
            <div class="info-card">
              <h3 class="label">STATUS</h3>
              <p class="value">{{ showsStore.selectedShow.status }}</p>
            </div>

            <div class="info-card">
              <h3 class="label">PREMIERED</h3>
              <p class="value">{{ formattedPremiered }}</p>
            </div>

            <div class="info-card">
              <h3 class="label">NETWORK</h3>
              <p class="value">{{ networkName }}</p>
            </div>

            <div class="info-card">
              <h3 class="label">SCHEDULE</h3>
              <p class="value">
                {{ showsStore.selectedShow.schedule.days.join(', ') }}
                at {{ showsStore.selectedShow.schedule.time }}
              </p>
            </div>

            <div class="info-card">
              <h3 class="label">LANGUAGE</h3>
              <p class="value">{{ showsStore.selectedShow.language }}</p>
            </div>

            <div class="info-card">
              <h3 class="label">TYPE</h3>
              <p class="value">{{ showsStore.selectedShow.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.show-details-page {
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Layout Structure */
.main-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-16);
  padding: var(--spacing-8) var(--spacing-12);
}

/* Sidebar / Poster */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.poster-wrapper {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-surface-dim);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  aspect-ratio: 2/3;
  width: 100%;
  max-width: 300px;
  margin: 0 auto; /* Center on mobile */
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
}

/* Details Grid (Right Column) */
.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
  align-content: start;
}

/* Info Card Styling */
.info-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.info-card.full-width {
  grid-column: 1 / -1;
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.value {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-normal);
  margin: 0;
}

.text-content {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}

/* Loading / Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--spacing-4);
  color: var(--color-text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-surface-dim);
  border-top-color: var(--color-brand-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Breakpoints */
@media (min-width: 768px) {
  .main-body {
    grid-template-columns: 300px 1fr; /* Fixed sidebar, flexible content */
    gap: var(--spacing-10);
  }

  .details-grid {
    /* 2 columns for info cards on tablet+ */
    grid-template-columns: repeat(2, 1fr);
  }

  .poster-wrapper,
  .back-btn {
    margin: 0; /* Reset auto margins */
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .details-grid {
    gap: var(--spacing-6);
  }
}
</style>
