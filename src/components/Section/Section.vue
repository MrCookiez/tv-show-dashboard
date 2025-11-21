<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
// @ts-ignore: no type declarations for CSS import from 'swiper'
import 'swiper/css'
import Card from '../Card/Card.vue'
import type { Show } from '../../types/shows'

defineProps<{
  title: string
  shows: Show[]
}>()

// Emitting an event in case you want to handle navigation later
const emit = defineEmits<{
  (e: 'viewAll'): void
}>()

// Swiper Configuration
// Showing partial slides (.2) encourages users to scroll horizontally
const swiperBreakpoints = {
  320: { slidesPerView: 2.2, spaceBetween: 16 },
  480: { slidesPerView: 3.2, spaceBetween: 16 },
  768: { slidesPerView: 4.2, spaceBetween: 20 },
  1024: { slidesPerView: 5.2, spaceBetween: 24 },
  1280: { slidesPerView: 6.2, spaceBetween: 24 },
}
</script>

<template>
  <section class="group-section">
    <!-- Section Header -->
    <header class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <button class="view-all-btn" @click="emit('viewAll')">
        View All <span class="arrow">→</span>
      </button>
    </header>

    <!-- Carousel Content -->
    <div class="section-content">
      <Swiper :breakpoints="swiperBreakpoints" :space-between="20" class="show-swiper">
        <SwiperSlide v-for="show in shows" :key="show.id">
          <Card :show="show" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.group-section {
  margin-bottom: var(--spacing-10);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
  padding: 0 var(--spacing-1);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.view-all-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  transition: color 0.2s ease;
}

.view-all-btn:hover {
  color: var(--color-brand-secondary);
}

.arrow {
  font-size: 1.1em;
  line-height: 1;
}

/* Swiper Adjustments */
.show-swiper {
  padding: var(--spacing-2); /* Padding for hover shadows */
  margin: calc(var(--spacing-2) * -1); /* Negative margin to allow shadows */
}

:deep(.swiper-wrapper) {
  /* Ensure flex behavior for slides so cards are same height */
  align-items: stretch;
}

:deep(.swiper-slide) {
  height: auto; /* Allow cards to define height */
}

@media (min-width: 1024px) {
  .section-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
