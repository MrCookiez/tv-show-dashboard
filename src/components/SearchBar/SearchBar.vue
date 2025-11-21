<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localQuery = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    localQuery.value = newValue
  }
)

// @Todo: Let's add debouncing here later
const onInput = () => {
  emit('update:modelValue', localQuery.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      v-model="localQuery"
      type="text"
      placeholder="Search shows..."
      class="search-input"
      @input="onInput"
      aria-label="Search shows"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md, 8px);
  padding: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease;
}

.search-bar:focus-within {
  border-color: var(--color-text-secondary);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: var(--font-size-lg, 1.125rem);
  color: var(--color-text-primary);
  background: transparent;
  padding: 0 var(--spacing-2);
}

.search-input::placeholder {
  color: var(--color-text-disabled);
}
</style>
