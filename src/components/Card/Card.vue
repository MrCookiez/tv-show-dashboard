<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Show } from '../../types/shows'

const props = defineProps<{
  show: Show
}>()

const router = useRouter()
const isImageLoaded = ref(false)

const imageUrl = computed(() => {
  return (
    props.show.image?.medium ||
    props.show.image?.original ||
    'https://placehold.co/210x295?text=No+Image'
  )
})

const navigateToDetails = () => {
  router.push(`/show/${props.show.id}`)
}

const onImageLoad = () => {
  isImageLoaded.value = true
}
</script>

<template>
  <article
    class="show-card"
    @click="navigateToDetails"
    tabindex="0"
    @keydown.enter="navigateToDetails"
    role="link"
    :aria-label="`View details for ${show.name}`"
  >
    <div class="image-container">
      <div v-if="!isImageLoaded" class="skeleton-loader"></div>

      <img
        :src="imageUrl"
        :alt="show.name"
        class="show-image"
        :class="{ 'is-loaded': isImageLoaded }"
        loading="lazy"
        @load="onImageLoad"
      />

      <div class="overlay"></div>
    </div>

    <div class="content">
      <h3 class="title">{{ show.name }}</h3>
      <div class="meta">
        <span class="rating" v-if="show.rating?.average"> ⭐ {{ show.rating.average }} </span>
        <span class="genres" v-if="show.genres?.length">
          {{ show.genres.slice(0, 2).join(' • ') }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.show-card {
  position: relative;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background-color: var(--color-surface-dim, #2c2c2c);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.show-card:hover,
.show-card:focus-visible {
  transform: scale(1.03);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
  outline: none;
}

/* Image Handling */
.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.show-image.is-loaded {
  opacity: 1;
}

.skeleton-loader {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-surface-dim) 25%,
    var(--color-border) 50%,
    var(--color-surface-dim) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Overlay & Content */
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%; /* Covers bottom 60% */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
}

.content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--spacing-4, 1rem);
  z-index: 2;
  color: white; /* Always white due to dark overlay */
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  /* Truncate text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Truncate */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rating {
  font-weight: 600;
  color: #ffd700; /* Gold color for star */
}
</style>
