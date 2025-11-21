<script setup lang="ts">
// 1. Import the specific module
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
// @ts-ignore: no type declarations for CSS import from 'swiper'
import 'swiper/css'
import Card from '../Card/Card.vue'
import type { Show } from '../../types/shows'

defineProps<{
  title: string
  shows: Show[]
}>()

const emit = defineEmits<{
  (e: 'viewAll'): void
}>()

// 2. Create an array containing the module
const modules = [Mousewheel]

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
    <header class="section-header">
      <h2 class="section-title">{{ title }}</h2>
    </header>

    <div class="section-content">
      <Swiper
        :modules="modules"
        :mousewheel="{ forceToAxis: true }"
        :breakpoints="swiperBreakpoints"
        :space-between="20"
        class="show-swiper"
      >
        <SwiperSlide v-for="show in shows" :key="show.id">
          <Card :show="show" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
/* ... your existing styles remain unchanged ... */
.group-section {
  margin-bottom: var(--spacing-10);
}
/* ... */
</style>
