<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import './assets/styles/reset.css'
import './assets/styles/theme.css'
import './assets/styles/global.css'
</script>

<template>
  <HelloWorld msg="MOVIE BANK" />
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped></style>
